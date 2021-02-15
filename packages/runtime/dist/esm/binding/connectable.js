import { def, defineHiddenProp, ensureProto } from '../utilities-objects.js';
import { getArrayObserver } from '../observation/array-observer.js';
import { getSetObserver } from '../observation/set-observer.js';
import { getMapObserver } from '../observation/map-observer.js';
// TODO: add connect-queue (or something similar) back in when everything else is working, to improve startup time
const slotNames = [];
const versionSlotNames = [];
let lastSlot = -1;
function ensureEnoughSlotNames(currentSlot) {
    if (currentSlot === lastSlot) {
        lastSlot += 5;
        const ii = slotNames.length = versionSlotNames.length = lastSlot + 1;
        let i = currentSlot + 1;
        for (; i < ii; ++i) {
            slotNames[i] = `_o${i}`;
            versionSlotNames[i] = `_v${i}`;
        }
    }
}
ensureEnoughSlotNames(-1);
function observeProperty(obj, key) {
    const observer = this.observerLocator.getObserver(obj, key);
    /* Note: we need to cast here because we can indeed get an accessor instead of an observer,
     *  in which case the call to observer.subscribe will throw. It's not very clean and we can solve this in 2 ways:
     *  1. Fail earlier: only let the locator resolve observers from .getObserver, and throw if no branches are left (e.g. it would otherwise return an accessor)
     *  2. Fail silently (without throwing): give all accessors a no-op subscribe method
     *
     * We'll probably want to implement some global configuration (like a "strict" toggle) so users can pick between enforced correctness vs. ease-of-use
     */
    this.obs.add(observer);
}
function getObserverRecord() {
    const record = new BindingObserverRecord(this);
    defineHiddenProp(this, 'obs', record);
    return record;
}
function observeCollection(collection) {
    let obs;
    if (collection instanceof Array) {
        obs = getArrayObserver(collection);
    }
    else if (collection instanceof Set) {
        obs = getSetObserver(collection);
    }
    else if (collection instanceof Map) {
        obs = getMapObserver(collection);
    }
    else {
        throw new Error('Unrecognised collection type.');
    }
    this.obs.add(obs);
}
function subscribeTo(subscribable) {
    this.obs.add(subscribable);
}
function noopHandleChange() {
    throw new Error('method "handleChange" not implemented');
}
function noopHandleCollectionChange() {
    throw new Error('method "handleCollectionChange" not implemented');
}
export class BindingObserverRecord {
    constructor(binding) {
        this.binding = binding;
        this.version = 0;
        this.count = 0;
        connectable.assignIdTo(this);
    }
    handleChange(value, oldValue, flags) {
        return this.binding.interceptor.handleChange(value, oldValue, flags);
    }
    handleCollectionChange(indexMap, flags) {
        this.binding.interceptor.handleCollectionChange(indexMap, flags);
    }
    /**
     * Add, and subscribe to a given observer
     */
    add(observer) {
        // find the observer.
        const observerSlots = this.count == null ? 0 : this.count;
        let i = observerSlots;
        while (i-- && this[slotNames[i]] !== observer)
            ;
        // if we are not already observing, put the observer in an open slot and subscribe.
        if (i === -1) {
            i = 0;
            while (this[slotNames[i]]) {
                i++;
            }
            this[slotNames[i]] = observer;
            observer.subscribe(this);
            // increment the slot count.
            if (i === observerSlots) {
                this.count = i + 1;
            }
        }
        this[versionSlotNames[i]] = this.version;
        ensureEnoughSlotNames(i);
    }
    /**
     * Unsubscribe the observers that are not up to date with the record version
     */
    clear(all) {
        const slotCount = this.count;
        let slotName;
        let observer;
        let i = 0;
        if (all === true) {
            for (; i < slotCount; ++i) {
                slotName = slotNames[i];
                observer = this[slotName];
                if (observer != null) {
                    this[slotName] = void 0;
                    observer.unsubscribe(this);
                }
            }
            this.count = 0;
        }
        else {
            for (; i < slotCount; ++i) {
                if (this[versionSlotNames[i]] !== this.version) {
                    slotName = slotNames[i];
                    observer = this[slotName];
                    if (observer != null) {
                        this[slotName] = void 0;
                        observer.unsubscribe(this);
                        this.count--;
                    }
                }
            }
        }
    }
}
function connectableDecorator(target) {
    const proto = target.prototype;
    ensureProto(proto, 'observeProperty', observeProperty, true);
    ensureProto(proto, 'observeCollection', observeCollection, true);
    ensureProto(proto, 'subscribeTo', subscribeTo, true);
    def(proto, 'obs', { get: getObserverRecord });
    // optionally add these two methods to normalize a connectable impl
    ensureProto(proto, 'handleChange', noopHandleChange);
    ensureProto(proto, 'handleCollectionChange', noopHandleCollectionChange);
    return target;
}
export function connectable(target) {
    return target == null ? connectableDecorator : connectableDecorator(target);
}
let idValue = 0;
connectable.assignIdTo = (instance) => {
    instance.id = ++idValue;
};
// @connectable
export class BindingMediator {
    constructor(key, binding, observerLocator, locator) {
        this.key = key;
        this.binding = binding;
        this.observerLocator = observerLocator;
        this.locator = locator;
        this.interceptor = this;
        connectable.assignIdTo(this);
    }
    $bind(flags, scope, hostScope, projection) {
        throw new Error('Method not implemented.');
    }
    $unbind(flags) {
        throw new Error('Method not implemented.');
    }
    handleChange(newValue, previousValue, flags) {
        this.binding[this.key](newValue, previousValue, flags);
    }
}
connectableDecorator(BindingMediator);
//# sourceMappingURL=connectable.js.map