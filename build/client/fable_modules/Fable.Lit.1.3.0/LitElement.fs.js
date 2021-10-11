import { class_type } from "../fable-library.3.4.0/Reflection.js";
import { curry, mapCurriedArgs, jsOptions } from "../fable-library.3.4.0/Util.js";
import { zip, iterate } from "../fable-library.3.4.0/Seq.js";
import { defaultArg, some, toArray } from "../fable-library.3.4.0/Option.js";
import { HookContext } from "./Hook.fs.js";
import { LitElement } from "lit";
import { toArray as toArray_1 } from "../fable-library.3.4.0/List.js";
import { Attribute } from "../fable-library.3.4.0/Types.js";

function LitElementUtil_isNotNull(x) {
    return !(x == null);
}

function LitElementUtil_isNotReferenceEquals(x, y) {
    return !(x === y);
}

function LitElementUtil_failInit() {
    throw (new Error("LitElement.init must be called on top of the render function"));
}

function LitElementUtil_failProps(key) {
    throw (new Error(`'${key}' field in \`props\` record is not of Prop<'T> type`));
}

export class Prop {
    constructor(defaultValue, options) {
        this.defaultValue = defaultValue;
        this.options = options;
    }
}

export function Prop$reflection() {
    return class_type("Lit.Prop", void 0, Prop);
}

export function Prop_$ctor_541DA560(defaultValue, options) {
    return new Prop(defaultValue, options);
}

export class Prop$1 extends Prop {
    constructor(defaultValue, options) {
        super(defaultValue, options);
        this.defaultValue_1 = defaultValue;
    }
}

export function Prop$1$reflection(gen0) {
    return class_type("Lit.Prop`1", [gen0], Prop$1, Prop$reflection());
}

export function Prop$1_$ctor_4E398B2E(defaultValue, options) {
    return new Prop$1(defaultValue, options);
}

export function Prop__ToConfig(_) {
    return [_.defaultValue, _.options];
}

export function Prop_Of_6B8EFA6B(defaultValue, attribute, hasChanged, fromAttribute, toAttribute, reflect) {
    return Prop$1_$ctor_4E398B2E(defaultValue, jsOptions((o) => {
        let matchValue;
        iterate((v) => {
            o.type = v;
        }, toArray((matchValue = defaultValue, ((typeof matchValue) === "string") ? some(String) : (((typeof matchValue) === "number") ? some(Number) : (((typeof matchValue) === "number") ? some(Number) : (((typeof matchValue) === "boolean") ? some(Boolean) : (void 0)))))));
        iterate((v_1) => {
            o.reflect = v_1;
        }, toArray(reflect));
        iterate(mapCurriedArgs((v_2) => {
            o.hasChanged = curry(2, v_2);
        }, [[0, 2]]), toArray(curry(2, hasChanged)));
        iterate((att) => {
            const matchValue_1 = att.trim();
            switch (matchValue_1) {
                case null:
                case "": {
                    o.attribute = false;
                    break;
                }
                default: {
                    o.attribute = matchValue_1;
                }
            }
        }, toArray(attribute));
        const matchValue_2 = [fromAttribute, toAttribute];
        let pattern_matching_result;
        if (matchValue_2[0] != null) {
            pattern_matching_result = 0;
        }
        else if (matchValue_2[1] != null) {
            pattern_matching_result = 0;
        }
        else {
            pattern_matching_result = 1;
        }
        switch (pattern_matching_result) {
            case 0: {
                o.converter = jsOptions((o_1) => {
                    iterate((v_3) => {
                        o_1.fromAttribute = v_3;
                    }, toArray(fromAttribute));
                    iterate((v_4) => {
                        o_1.toAttribute = v_4;
                    }, toArray(toAttribute));
                });
                break;
            }
            case 1: {
                break;
            }
        }
    }));
}

export class LitElementInit$1 {
    constructor() {
        this._initPromise = null;
        this._useShadowDom = true;
        this._props = null;
        this._styles = null;
    }
    get props() {
        const _ = this;
        return _._props;
    }
    set props(v) {
        const _ = this;
        _._props = v;
    }
    get styles() {
        const _ = this;
        return _._styles;
    }
    set styles(v) {
        const _ = this;
        _._styles = v;
    }
    get useShadowDom() {
        const _ = this;
        return _._useShadowDom;
    }
    set useShadowDom(v) {
        const _ = this;
        _._useShadowDom = v;
    }
    init(initFn) {
        const this$ = this;
        this$._initPromise = initFn(this$);
        return [null, null];
    }
    get hooks() {
        return LitElementUtil_failInit();
    }
}

export function LitElementInit$1$reflection(gen0) {
    return class_type("Lit.LitElementInit`1", [gen0], LitElementInit$1);
}

export function LitElementInit$1_$ctor() {
    return new LitElementInit$1();
}

export function LitElementInit$1__get_InitPromise(_) {
    return _._initPromise;
}

export class LitHookElement$1 extends LitElement {
    constructor(initProps) {
        super();
        this._hooks = (new HookContext(this));
        initProps(this);
    }
    render() {
        const _ = this;
        return _._hooks.render();
    }
    disconnectedCallback() {
        const _ = this;
        super.disconnectedCallback();
        _._hooks.disconnect();
    }
    connectedCallback() {
        const _ = this;
        super.connectedCallback();
        _._hooks.runEffects(true, false);
    }
    init(_arg1) {
        const this$ = this;
        return [this$, this$];
    }
    get hooks() {
        const _ = this;
        return _._hooks;
    }
}

export function LitHookElement$1$reflection(gen0) {
    return class_type("Lit.LitHookElement`1", [gen0], LitHookElement$1, class_type("Lit.LitElement"));
}

export function LitHookElement$1_$ctor_61A0B331(initProps) {
    return new LitHookElement$1(initProps);
}

export class LitElementAttribute extends Attribute {
    constructor(name) {
        super();
        this.name = name;
    }
    Decorate(renderFn) {
        const this$ = this;
        const config = LitElementInit$1_$ctor();
        if (renderFn.length > 0) {
            throw (new Error("Render function for LitElement cannot take arguments"));
        }
        try {
            void renderFn.apply(config, []);
        }
        catch (matchValue) {
        }
        if (LitElementInit$1__get_InitPromise(config) == null) {
            LitElementUtil_failInit();
        }
        const pr = LitElementInit$1__get_InitPromise(config);
        void (pr.then((() => {
            let source2;
            const config_1 = config;
            const styles = LitElementUtil_isNotNull(config_1.styles) ? toArray_1(config_1.styles) : (void 0);
            let patternInput_1;
            if (LitElementUtil_isNotNull(config_1.props)) {
                const propsValues = [];
                const propsOptions = {};
                iterate((tupledArg) => {
                    const k = tupledArg[0];
                    let patternInput;
                    const matchValue_1 = tupledArg[1];
                    patternInput = ((matchValue_1 instanceof Prop) ? Prop__ToConfig(matchValue_1) : LitElementUtil_failProps(k));
                    const defVal = patternInput[0];
                    propsOptions[k] = patternInput[1];
                    if (!(defVal == null)) {
                        void (propsValues.push([k, defVal]));
                    }
                }, (source2 = Object.values(config_1.props), zip(Object.keys(config_1.props), source2)));
                patternInput_1 = [some(propsOptions), (this$_1) => {
                    iterate((tupledArg_1) => {
                        this$_1[tupledArg_1[0]] = tupledArg_1[1];
                    }, propsValues);
                }];
            }
            else {
                patternInput_1 = [void 0, (_arg1) => {
                }];
            }
            const classExpr = class extends LitHookElement$1 {
            constructor() { super(patternInput_1[1]) }
            get renderFn() { return renderFn }
            };
            iterate((props) => {
                Object.defineProperty(classExpr, "properties", { get: (() => props) });
            }, toArray(patternInput_1[0]));
            iterate((styles_1) => {
                Object.defineProperty(classExpr, "styles", { get: (() => styles_1) });
            }, toArray(styles));
            if (!config_1.useShadowDom) {
                classExpr.prototype.createRenderRoot = function() {
                return this;
                };
            }
            customElements.define(this$.name, classExpr);
        })));
        return () => {
            throw (new Error(`${this$.name} is not immediately callable, it must be created in HTML`));
        };
    }
}

export function LitElementAttribute$reflection() {
    return class_type("Lit.LitElementAttribute", void 0, LitElementAttribute, class_type("Fable.Core.JS.DecoratorAttribute"));
}

export function LitElementAttribute_$ctor_Z721C83C5(name) {
    return new LitElementAttribute(name);
}

export function Lit_LitElement__LitElement_dispatchEvent_ZCD7099C(this$, name, bubbles, composed, cancelable) {
    let opts;
    void this$.renderRoot.dispatchEvent((opts = {
        bubbles: defaultArg(bubbles, true),
        composed: defaultArg(composed, true),
        cancelable: defaultArg(cancelable, true),
    }, new Event(name, opts)));
}

export function Lit_LitElement__LitElement_dispatchCustomEvent_Z5A385FCE(this$, name, detail, bubbles, composed, cancelable) {
    let opts;
    void this$.renderRoot.dispatchEvent((opts = {
        detail: detail,
        bubbles: defaultArg(bubbles, true),
        composed: defaultArg(composed, true),
        cancelable: defaultArg(cancelable, true),
    }, new CustomEvent(name, opts)));
}

