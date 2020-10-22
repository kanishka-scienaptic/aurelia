import {
  Constructable,
  nextId,
  emptyArray,
  onResolve,
} from '@aurelia/kernel';
import {
  BindingMode,
  IDOM,
  IInstruction,
  IViewFactory,
  LifecycleFlags,
  CustomElementDefinition,
  bindable,
  customElement,
  MountStrategy,
  getCompositionContext,
  ICustomElementController,
  ISyntheticView,
  ICustomElementViewModel,
  IHydratedController,
  IHydratedParentController,
  ControllerVisitor,
} from '@aurelia/runtime';
import { createElement, CompositionPlan } from '../../create-element';
import { HTMLDOM } from '../../dom';
import { HydrateElementInstruction, Instruction } from '../../instructions';

export type Subject<T extends HTMLElement = HTMLElement> = IViewFactory<T> | ISyntheticView<T> | CompositionPlan<T> | Constructable | CustomElementDefinition;
export type MaybeSubjectPromise<T extends HTMLElement> = Subject<T> | Promise<Subject<T>> | undefined;

function toLookup(
  acc: Record<string, Instruction>,
  item: IInstruction & { to?: string },
): Record<string, Instruction> {
  const to = item.to;
  if (to !== void 0 && to !== 'subject' && to !== 'composing') {
    acc[to] = item as Instruction;
  }

  return acc;
}

@customElement({ name: 'au-compose', template: null, containerless: true })
export class Compose<T extends HTMLElement = HTMLElement> implements ICustomElementViewModel<T> {
  public readonly id: number = nextId('au$component');

  @bindable public subject?: MaybeSubjectPromise<T> = void 0;
  @bindable({ mode: BindingMode.fromView }) public composing: boolean = false;

  public view?: ISyntheticView<T> = void 0;

  private readonly properties: Record<string, Instruction>;

  private lastSubject?: MaybeSubjectPromise<T> = void 0;

  public readonly $controller!: ICustomElementController<T, this>; // This is set by the controller after this instance is constructed

  public constructor(
    @IDOM private readonly dom: HTMLDOM,
    @IInstruction instruction: HydrateElementInstruction,
  ) {
    this.properties = instruction.instructions.reduce(toLookup, {});
  }

  public afterAttach(
    initiator: IHydratedController<T>,
    parent: IHydratedParentController<T> | null,
    flags: LifecycleFlags,
  ): void | Promise<void> {
    const { subject, view } = this;
    if (view === void 0 || this.lastSubject !== subject) {
      this.lastSubject = subject;
      this.composing = true;

      return this.compose(void 0, subject, initiator, flags);
    }

    return this.compose(view, subject, initiator, flags);
  }

  public afterUnbind(
    initiator: IHydratedController<T>,
    parent: IHydratedParentController<T> | null,
    flags: LifecycleFlags,
  ): void | Promise<void> {
    return this.deactivate(this.view, initiator, flags);
  }

  public subjectChanged(
    newValue: Subject<T> | Promise<Subject<T>>,
    previousValue: Subject<T> | Promise<Subject<T>>,
    flags: LifecycleFlags,
  ): void {
    const { $controller } = this;
    if (!$controller.isActive) {
      return;
    }
    if (this.lastSubject === newValue) {
      return;
    }

    this.lastSubject = newValue;
    this.composing = true;

    flags |= $controller.flags;
    const ret = onResolve(
      this.deactivate(this.view, null, flags),
      () => {
        // TODO(fkleuver): handle & test race condition
        return this.compose(void 0, newValue, null, flags);
      },
    );
    if (ret instanceof Promise) { ret.catch(err => { throw err; }); }
  }

  private compose(
    view: ISyntheticView<T> | undefined | Promise<ISyntheticView<T> | undefined>,
    subject: MaybeSubjectPromise<T>,
    initiator: IHydratedController<T> | null,
    flags: LifecycleFlags,
  ): void | Promise<void> {
    return onResolve(
      view === void 0
      ? onResolve(subject, resolvedSubject => {
        return this.resolveView(resolvedSubject, flags);
      })
      : view,
      resolvedView => {
        return this.activate(resolvedView, initiator, flags);
      },
    );
  }

  private deactivate(
    view: ISyntheticView<T> | undefined,
    initiator: IHydratedController<T> | null,
    flags: LifecycleFlags,
  ): void | Promise<void> {
    return view?.deactivate(initiator ?? view, this.$controller, flags);
  }

  private activate(
    view: ISyntheticView<T> | undefined,
    initiator: IHydratedController<T> | null,
    flags: LifecycleFlags,
  ): void | Promise<void> {
    const { $controller } = this;
    return onResolve(
      view?.activate(initiator ?? view, $controller, flags, $controller.scope, $controller.hostScope),
      () => {
        this.composing = false;
      },
    );
  }

  private resolveView(subject: Subject<T> | undefined, flags: LifecycleFlags): ISyntheticView<T> | undefined {
    const view = this.provideViewFor(subject, flags);

    if (view) {
      view.setLocation(this.$controller.projector!.host, MountStrategy.insertBefore);
      view.lockScope(this.$controller.scope);
      return view;
    }

    return void 0;
  }

  private provideViewFor(subject: Subject<T> | undefined, flags: LifecycleFlags): ISyntheticView<T> | undefined {
    if (!subject) {
      return void 0;
    }

    if (isController(subject)) { // IController
      return subject;
    }

    if ('createView' in subject) { // CompositionPlan
      return subject.createView(this.$controller.context!);
    }

    if ('create' in subject) { // IViewFactory
      return subject.create(flags);
    }

    if ('template' in subject) { // Raw Template Definition
      const definition = CustomElementDefinition.getOrCreate(subject);
      return getCompositionContext<T>(definition, this.$controller.context!).getViewFactory().create(flags);
    }

    // Constructable (Custom Element Constructor)
    return createElement<T>(
      this.dom,
      subject,
      this.properties,
      this.$controller.projector === void 0
        ? emptyArray
        : this.$controller.projector.children
    ).createView(this.$controller.context!);
  }

  public onCancel(
    initiator: IHydratedController<T>,
    parent: IHydratedParentController<T>,
    flags: LifecycleFlags,
  ): void {
    this.view?.cancel(initiator, this.$controller, flags);
  }

  public dispose(): void {
    this.view?.dispose();
    this.view = (void 0)!;
  }

  public accept(visitor: ControllerVisitor<T>): void | true {
    if (this.view?.accept(visitor) === true) {
      return true;
    }
  }
}

function isController<T extends HTMLElement = HTMLElement>(subject: Subject<T>): subject is ISyntheticView<T> {
  return 'lockScope' in subject;
}
