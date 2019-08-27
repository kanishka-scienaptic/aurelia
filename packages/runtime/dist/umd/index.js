(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./binding/ast", "./binding/property-binding", "./binding/call-binding", "./binding/connectable", "./binding/expression-parser", "./binding/interpolation-binding", "./binding/let-binding", "./binding/ref-binding", "./observation/array-observer", "./observation/map-observer", "./observation/set-observer", "./observation/binding-context", "./observation/collection-length-observer", "./observation/collection-size-observer", "./observation/computed-observer", "./observation/dirty-checker", "./observation/observer-locator", "./observation/primitive-observer", "./observation/property-accessor", "./observation/proxy-observer", "./observation/self-observer", "./observation/setter-observer", "./observation/signaler", "./observation/subscriber-collection", "./resources/binding-behavior", "./resources/binding-behaviors/binding-mode", "./resources/binding-behaviors/debounce", "./resources/binding-behaviors/priority", "./resources/binding-behaviors/signals", "./resources/binding-behaviors/throttle", "./resources/custom-attribute", "./resources/custom-attributes/flags", "./resources/custom-attributes/if", "./resources/custom-attributes/repeat", "./resources/custom-attributes/replaceable", "./resources/custom-attributes/with", "./resources/custom-element", "./resources/value-converter", "./resources/value-converters/sanitize", "./resources/value-converters/view", "./templating/bindable", "./templating/children", "./templating/controller", "./templating/view", "./aurelia", "./configuration", "./definitions", "./dom", "./flags", "./instructions", "./lifecycle", "./lifecycle-task", "./observation", "./renderer", "./rendering-engine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ast_1 = require("./binding/ast");
    exports.CallFunctionExpression = ast_1.CallFunctionExpression;
    exports.connects = ast_1.connects;
    exports.observes = ast_1.observes;
    exports.callsFunction = ast_1.callsFunction;
    exports.hasAncestor = ast_1.hasAncestor;
    exports.isAssignable = ast_1.isAssignable;
    exports.isLeftHandSide = ast_1.isLeftHandSide;
    exports.isPrimary = ast_1.isPrimary;
    exports.isResource = ast_1.isResource;
    exports.hasBind = ast_1.hasBind;
    exports.hasUnbind = ast_1.hasUnbind;
    exports.isLiteral = ast_1.isLiteral;
    exports.arePureLiterals = ast_1.arePureLiterals;
    exports.isPureLiteral = ast_1.isPureLiteral;
    exports.CustomExpression = ast_1.CustomExpression;
    exports.BindingBehaviorExpression = ast_1.BindingBehaviorExpression;
    exports.ValueConverterExpression = ast_1.ValueConverterExpression;
    exports.AssignExpression = ast_1.AssignExpression;
    exports.ConditionalExpression = ast_1.ConditionalExpression;
    exports.AccessThisExpression = ast_1.AccessThisExpression;
    exports.AccessScopeExpression = ast_1.AccessScopeExpression;
    exports.AccessMemberExpression = ast_1.AccessMemberExpression;
    exports.AccessKeyedExpression = ast_1.AccessKeyedExpression;
    exports.CallScopeExpression = ast_1.CallScopeExpression;
    exports.CallMemberExpression = ast_1.CallMemberExpression;
    exports.BinaryExpression = ast_1.BinaryExpression;
    exports.UnaryExpression = ast_1.UnaryExpression;
    exports.PrimitiveLiteralExpression = ast_1.PrimitiveLiteralExpression;
    exports.HtmlLiteralExpression = ast_1.HtmlLiteralExpression;
    exports.ArrayLiteralExpression = ast_1.ArrayLiteralExpression;
    exports.ObjectLiteralExpression = ast_1.ObjectLiteralExpression;
    exports.TemplateExpression = ast_1.TemplateExpression;
    exports.TaggedTemplateExpression = ast_1.TaggedTemplateExpression;
    exports.ArrayBindingPattern = ast_1.ArrayBindingPattern;
    exports.ObjectBindingPattern = ast_1.ObjectBindingPattern;
    exports.BindingIdentifier = ast_1.BindingIdentifier;
    exports.ForOfStatement = ast_1.ForOfStatement;
    exports.Interpolation = ast_1.Interpolation;
    var property_binding_1 = require("./binding/property-binding");
    exports.PropertyBinding = property_binding_1.PropertyBinding;
    var call_binding_1 = require("./binding/call-binding");
    exports.CallBinding = call_binding_1.CallBinding;
    var connectable_1 = require("./binding/connectable");
    exports.connectable = connectable_1.connectable;
    var expression_parser_1 = require("./binding/expression-parser");
    exports.IExpressionParser = expression_parser_1.IExpressionParser;
    exports.BindingType = expression_parser_1.BindingType;
    var interpolation_binding_1 = require("./binding/interpolation-binding");
    exports.MultiInterpolationBinding = interpolation_binding_1.MultiInterpolationBinding;
    exports.InterpolationBinding = interpolation_binding_1.InterpolationBinding;
    var let_binding_1 = require("./binding/let-binding");
    exports.LetBinding = let_binding_1.LetBinding;
    var ref_binding_1 = require("./binding/ref-binding");
    exports.RefBinding = ref_binding_1.RefBinding;
    var array_observer_1 = require("./observation/array-observer");
    exports.ArrayObserver = array_observer_1.ArrayObserver;
    exports.enableArrayObservation = array_observer_1.enableArrayObservation;
    exports.disableArrayObservation = array_observer_1.disableArrayObservation;
    var map_observer_1 = require("./observation/map-observer");
    exports.MapObserver = map_observer_1.MapObserver;
    exports.enableMapObservation = map_observer_1.enableMapObservation;
    exports.disableMapObservation = map_observer_1.disableMapObservation;
    var set_observer_1 = require("./observation/set-observer");
    exports.SetObserver = set_observer_1.SetObserver;
    exports.enableSetObservation = set_observer_1.enableSetObservation;
    exports.disableSetObservation = set_observer_1.disableSetObservation;
    var binding_context_1 = require("./observation/binding-context");
    exports.BindingContext = binding_context_1.BindingContext;
    exports.Scope = binding_context_1.Scope;
    exports.OverrideContext = binding_context_1.OverrideContext;
    var collection_length_observer_1 = require("./observation/collection-length-observer");
    exports.CollectionLengthObserver = collection_length_observer_1.CollectionLengthObserver;
    var collection_size_observer_1 = require("./observation/collection-size-observer");
    exports.CollectionSizeObserver = collection_size_observer_1.CollectionSizeObserver;
    var computed_observer_1 = require("./observation/computed-observer");
    exports.computed = computed_observer_1.computed;
    exports.createComputedObserver = computed_observer_1.createComputedObserver;
    exports.CustomSetterObserver = computed_observer_1.CustomSetterObserver;
    exports.GetterObserver = computed_observer_1.GetterObserver;
    var dirty_checker_1 = require("./observation/dirty-checker");
    exports.IDirtyChecker = dirty_checker_1.IDirtyChecker;
    exports.DirtyCheckProperty = dirty_checker_1.DirtyCheckProperty;
    exports.DirtyCheckSettings = dirty_checker_1.DirtyCheckSettings;
    var observer_locator_1 = require("./observation/observer-locator");
    exports.IObserverLocator = observer_locator_1.IObserverLocator;
    exports.ITargetObserverLocator = observer_locator_1.ITargetObserverLocator;
    exports.ITargetAccessorLocator = observer_locator_1.ITargetAccessorLocator;
    exports.getCollectionObserver = observer_locator_1.getCollectionObserver;
    exports.ObserverLocator = observer_locator_1.ObserverLocator;
    var primitive_observer_1 = require("./observation/primitive-observer");
    exports.PrimitiveObserver = primitive_observer_1.PrimitiveObserver;
    var property_accessor_1 = require("./observation/property-accessor");
    exports.PropertyAccessor = property_accessor_1.PropertyAccessor;
    var proxy_observer_1 = require("./observation/proxy-observer");
    exports.ProxyObserver = proxy_observer_1.ProxyObserver;
    var self_observer_1 = require("./observation/self-observer");
    exports.SelfObserver = self_observer_1.SelfObserver;
    var setter_observer_1 = require("./observation/setter-observer");
    exports.SetterObserver = setter_observer_1.SetterObserver;
    var signaler_1 = require("./observation/signaler");
    exports.ISignaler = signaler_1.ISignaler;
    var subscriber_collection_1 = require("./observation/subscriber-collection");
    exports.subscriberCollection = subscriber_collection_1.subscriberCollection;
    exports.collectionSubscriberCollection = subscriber_collection_1.collectionSubscriberCollection;
    exports.proxySubscriberCollection = subscriber_collection_1.proxySubscriberCollection;
    var binding_behavior_1 = require("./resources/binding-behavior");
    exports.bindingBehavior = binding_behavior_1.bindingBehavior;
    exports.BindingBehavior = binding_behavior_1.BindingBehavior;
    var binding_mode_1 = require("./resources/binding-behaviors/binding-mode");
    exports.BindingModeBehavior = binding_mode_1.BindingModeBehavior;
    exports.OneTimeBindingBehavior = binding_mode_1.OneTimeBindingBehavior;
    exports.ToViewBindingBehavior = binding_mode_1.ToViewBindingBehavior;
    exports.FromViewBindingBehavior = binding_mode_1.FromViewBindingBehavior;
    exports.TwoWayBindingBehavior = binding_mode_1.TwoWayBindingBehavior;
    var debounce_1 = require("./resources/binding-behaviors/debounce");
    exports.DebounceBindingBehavior = debounce_1.DebounceBindingBehavior;
    var priority_1 = require("./resources/binding-behaviors/priority");
    exports.PriorityBindingBehavior = priority_1.PriorityBindingBehavior;
    var signals_1 = require("./resources/binding-behaviors/signals");
    exports.SignalBindingBehavior = signals_1.SignalBindingBehavior;
    var throttle_1 = require("./resources/binding-behaviors/throttle");
    exports.ThrottleBindingBehavior = throttle_1.ThrottleBindingBehavior;
    var custom_attribute_1 = require("./resources/custom-attribute");
    exports.customAttribute = custom_attribute_1.customAttribute;
    exports.CustomAttribute = custom_attribute_1.CustomAttribute;
    exports.dynamicOptions = custom_attribute_1.dynamicOptions;
    exports.templateController = custom_attribute_1.templateController;
    var flags_1 = require("./resources/custom-attributes/flags");
    exports.FrequentMutations = flags_1.FrequentMutations;
    exports.InfrequentMutations = flags_1.InfrequentMutations;
    exports.ObserveShallow = flags_1.ObserveShallow;
    var if_1 = require("./resources/custom-attributes/if");
    exports.If = if_1.If;
    exports.Else = if_1.Else;
    var repeat_1 = require("./resources/custom-attributes/repeat");
    exports.Repeat = repeat_1.Repeat;
    var replaceable_1 = require("./resources/custom-attributes/replaceable");
    exports.Replaceable = replaceable_1.Replaceable;
    var with_1 = require("./resources/custom-attributes/with");
    exports.With = with_1.With;
    var custom_element_1 = require("./resources/custom-element");
    exports.containerless = custom_element_1.containerless;
    exports.customElement = custom_element_1.customElement;
    exports.CustomElement = custom_element_1.CustomElement;
    exports.IProjectorLocator = custom_element_1.IProjectorLocator;
    exports.useShadowDOM = custom_element_1.useShadowDOM;
    var value_converter_1 = require("./resources/value-converter");
    exports.valueConverter = value_converter_1.valueConverter;
    exports.ValueConverter = value_converter_1.ValueConverter;
    var sanitize_1 = require("./resources/value-converters/sanitize");
    exports.ISanitizer = sanitize_1.ISanitizer;
    exports.SanitizeValueConverter = sanitize_1.SanitizeValueConverter;
    var view_1 = require("./resources/value-converters/view");
    exports.ViewValueConverter = view_1.ViewValueConverter;
    var bindable_1 = require("./templating/bindable");
    exports.bindable = bindable_1.bindable;
    exports.Bindable = bindable_1.Bindable;
    var children_1 = require("./templating/children");
    exports.children = children_1.children;
    // These exports are temporary until we have a proper way to unit test them
    var controller_1 = require("./templating/controller");
    exports.Controller = controller_1.Controller;
    var view_2 = require("./templating/view");
    exports.ViewFactory = view_2.ViewFactory;
    exports.IViewLocator = view_2.IViewLocator;
    exports.ViewLocator = view_2.ViewLocator;
    exports.view = view_2.view;
    var aurelia_1 = require("./aurelia");
    exports.Aurelia = aurelia_1.Aurelia;
    exports.IDOMInitializer = aurelia_1.IDOMInitializer;
    exports.CompositionRoot = aurelia_1.CompositionRoot;
    var configuration_1 = require("./configuration");
    exports.IfRegistration = configuration_1.IfRegistration;
    exports.ElseRegistration = configuration_1.ElseRegistration;
    exports.RepeatRegistration = configuration_1.RepeatRegistration;
    exports.ReplaceableRegistration = configuration_1.ReplaceableRegistration;
    exports.WithRegistration = configuration_1.WithRegistration;
    exports.SanitizeValueConverterRegistration = configuration_1.SanitizeValueConverterRegistration;
    exports.DebounceBindingBehaviorRegistration = configuration_1.DebounceBindingBehaviorRegistration;
    exports.OneTimeBindingBehaviorRegistration = configuration_1.OneTimeBindingBehaviorRegistration;
    exports.ToViewBindingBehaviorRegistration = configuration_1.ToViewBindingBehaviorRegistration;
    exports.FromViewBindingBehaviorRegistration = configuration_1.FromViewBindingBehaviorRegistration;
    exports.PriorityBindingBehaviorRegistration = configuration_1.PriorityBindingBehaviorRegistration;
    exports.SignalBindingBehaviorRegistration = configuration_1.SignalBindingBehaviorRegistration;
    exports.ThrottleBindingBehaviorRegistration = configuration_1.ThrottleBindingBehaviorRegistration;
    exports.TwoWayBindingBehaviorRegistration = configuration_1.TwoWayBindingBehaviorRegistration;
    exports.RefBindingRendererRegistration = configuration_1.RefBindingRendererRegistration;
    exports.CallBindingRendererRegistration = configuration_1.CallBindingRendererRegistration;
    exports.CustomAttributeRendererRegistration = configuration_1.CustomAttributeRendererRegistration;
    exports.CustomElementRendererRegistration = configuration_1.CustomElementRendererRegistration;
    exports.InterpolationBindingRendererRegistration = configuration_1.InterpolationBindingRendererRegistration;
    exports.IteratorBindingRendererRegistration = configuration_1.IteratorBindingRendererRegistration;
    exports.LetElementRendererRegistration = configuration_1.LetElementRendererRegistration;
    exports.PropertyBindingRendererRegistration = configuration_1.PropertyBindingRendererRegistration;
    exports.SetPropertyRendererRegistration = configuration_1.SetPropertyRendererRegistration;
    exports.TemplateControllerRendererRegistration = configuration_1.TemplateControllerRendererRegistration;
    exports.DefaultResources = configuration_1.DefaultResources;
    exports.IObserverLocatorRegistration = configuration_1.IObserverLocatorRegistration;
    exports.ILifecycleRegistration = configuration_1.ILifecycleRegistration;
    exports.IRendererRegistration = configuration_1.IRendererRegistration;
    exports.RuntimeBasicConfiguration = configuration_1.RuntimeBasicConfiguration;
    var definitions_1 = require("./definitions");
    exports.buildTemplateDefinition = definitions_1.buildTemplateDefinition;
    exports.HooksDefinition = definitions_1.HooksDefinition;
    exports.isTargetedInstruction = definitions_1.isTargetedInstruction;
    exports.ITargetedInstruction = definitions_1.ITargetedInstruction;
    exports.TargetedInstructionType = definitions_1.TargetedInstructionType;
    var dom_1 = require("./dom");
    exports.DOM = dom_1.DOM;
    exports.INode = dom_1.INode;
    exports.IRenderLocation = dom_1.IRenderLocation;
    exports.IDOM = dom_1.IDOM;
    exports.NodeSequence = dom_1.NodeSequence;
    var flags_2 = require("./flags");
    exports.BindingMode = flags_2.BindingMode;
    exports.BindingStrategy = flags_2.BindingStrategy;
    exports.ExpressionKind = flags_2.ExpressionKind;
    exports.Hooks = flags_2.Hooks;
    exports.LifecycleFlags = flags_2.LifecycleFlags;
    exports.State = flags_2.State;
    var instructions_1 = require("./instructions");
    exports.CallBindingInstruction = instructions_1.CallBindingInstruction;
    exports.FromViewBindingInstruction = instructions_1.FromViewBindingInstruction;
    exports.HydrateAttributeInstruction = instructions_1.HydrateAttributeInstruction;
    exports.HydrateElementInstruction = instructions_1.HydrateElementInstruction;
    exports.HydrateTemplateController = instructions_1.HydrateTemplateController;
    exports.InterpolationInstruction = instructions_1.InterpolationInstruction;
    exports.IteratorBindingInstruction = instructions_1.IteratorBindingInstruction;
    exports.LetBindingInstruction = instructions_1.LetBindingInstruction;
    exports.LetElementInstruction = instructions_1.LetElementInstruction;
    exports.OneTimeBindingInstruction = instructions_1.OneTimeBindingInstruction;
    exports.RefBindingInstruction = instructions_1.RefBindingInstruction;
    exports.SetPropertyInstruction = instructions_1.SetPropertyInstruction;
    exports.ToViewBindingInstruction = instructions_1.ToViewBindingInstruction;
    exports.TwoWayBindingInstruction = instructions_1.TwoWayBindingInstruction;
    var lifecycle_1 = require("./lifecycle");
    exports.ViewModelKind = lifecycle_1.ViewModelKind;
    exports.ILifecycle = lifecycle_1.ILifecycle;
    exports.IController = lifecycle_1.IController;
    exports.IViewFactory = lifecycle_1.IViewFactory;
    exports.Priority = lifecycle_1.Priority;
    var lifecycle_task_1 = require("./lifecycle-task");
    exports.AggregateContinuationTask = lifecycle_task_1.AggregateContinuationTask;
    exports.TerminalTask = lifecycle_task_1.TerminalTask;
    exports.AggregateTerminalTask = lifecycle_task_1.AggregateTerminalTask;
    exports.ContinuationTask = lifecycle_task_1.ContinuationTask;
    exports.LifecycleTask = lifecycle_task_1.LifecycleTask;
    exports.PromiseTask = lifecycle_task_1.PromiseTask;
    exports.TaskSlot = lifecycle_task_1.TaskSlot;
    exports.StartTask = lifecycle_task_1.StartTask;
    exports.IStartTask = lifecycle_task_1.IStartTask;
    exports.IStartTaskManager = lifecycle_task_1.IStartTaskManager;
    exports.ProviderTask = lifecycle_task_1.ProviderTask;
    var observation_1 = require("./observation");
    exports.CollectionKind = observation_1.CollectionKind;
    exports.DelegationStrategy = observation_1.DelegationStrategy;
    exports.isIndexMap = observation_1.isIndexMap;
    exports.copyIndexMap = observation_1.copyIndexMap;
    exports.cloneIndexMap = observation_1.cloneIndexMap;
    exports.createIndexMap = observation_1.createIndexMap;
    var renderer_1 = require("./renderer");
    exports.instructionRenderer = renderer_1.instructionRenderer;
    exports.ensureExpression = renderer_1.ensureExpression;
    exports.addComponent = renderer_1.addComponent;
    exports.addBinding = renderer_1.addBinding;
    var rendering_engine_1 = require("./rendering-engine");
    exports.CompiledTemplate = rendering_engine_1.CompiledTemplate;
    exports.createRenderContext = rendering_engine_1.createRenderContext;
    exports.ChildrenObserver = rendering_engine_1.ChildrenObserver;
    exports.IInstructionRenderer = rendering_engine_1.IInstructionRenderer;
    exports.IRenderer = rendering_engine_1.IRenderer;
    exports.IRenderingEngine = rendering_engine_1.IRenderingEngine;
    exports.ITemplateCompiler = rendering_engine_1.ITemplateCompiler;
    exports.ITemplateFactory = rendering_engine_1.ITemplateFactory;
    exports.ViewCompileFlags = rendering_engine_1.ViewCompileFlags;
});
//# sourceMappingURL=index.js.map