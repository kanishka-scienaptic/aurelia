var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@aurelia/kernel", "../../dom.js", "../../templating/view.js", "../custom-attribute.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObserveShallow = exports.FrequentMutations = void 0;
    const kernel_1 = require("@aurelia/kernel");
    const dom_js_1 = require("../../dom.js");
    const view_js_1 = require("../../templating/view.js");
    const custom_attribute_js_1 = require("../custom-attribute.js");
    class FlagsTemplateController {
        constructor(factory, location, flags) {
            this.factory = factory;
            this.flags = flags;
            this.id = kernel_1.nextId('au$component');
            this.view = this.factory.create().setLocation(location);
        }
        attaching(initiator, parent, flags) {
            const { $controller } = this;
            return this.view.activate(initiator, $controller, flags | this.flags, $controller.scope, $controller.hostScope);
        }
        detaching(initiator, parent, flags) {
            return this.view.deactivate(initiator, this.$controller, flags);
        }
        dispose() {
            this.view.dispose();
            this.view = (void 0);
        }
        accept(visitor) {
            var _a;
            if (((_a = this.view) === null || _a === void 0 ? void 0 : _a.accept(visitor)) === true) {
                return true;
            }
        }
    }
    let FrequentMutations = class FrequentMutations extends FlagsTemplateController {
        constructor(factory, location) {
            super(factory, location, 8192 /* persistentTargetObserverQueue */);
        }
    };
    FrequentMutations = __decorate([
        custom_attribute_js_1.templateController('frequent-mutations'),
        __param(0, view_js_1.IViewFactory), __param(1, dom_js_1.IRenderLocation)
    ], FrequentMutations);
    exports.FrequentMutations = FrequentMutations;
    let ObserveShallow = class ObserveShallow extends FlagsTemplateController {
        constructor(factory, location) {
            super(factory, location, 2048 /* observeLeafPropertiesOnly */);
        }
    };
    ObserveShallow = __decorate([
        custom_attribute_js_1.templateController('observe-shallow'),
        __param(0, view_js_1.IViewFactory), __param(1, dom_js_1.IRenderLocation)
    ], ObserveShallow);
    exports.ObserveShallow = ObserveShallow;
});
//# sourceMappingURL=flags.js.map