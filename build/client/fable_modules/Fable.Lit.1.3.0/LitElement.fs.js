import { zip } from "../fable-library.3.4.0/Array.js";
import { name as name_1, class_type } from "../fable-library.3.4.0/Reflection.js";
import { curry, mapCurriedArgs, jsOptions } from "../fable-library.3.4.0/Util.js";
import { defaultArg, value as value_2, toArray, some } from "../fable-library.3.4.0/Option.js";
import { zip as zip_1, iterate } from "../fable-library.3.4.0/Seq.js";
import { HMRTypes_HMRToken__Subscribe_Z1AE52D65 } from "./HMR.fs.js";
import { HookContext } from "./Hook.fs.js";
import { LitElement } from "lit";
import { toArray as toArray_1 } from "../fable-library.3.4.0/List.js";
import { createRef } from "lit-html/directives/ref.js";
import { join } from "../fable-library.3.4.0/String.js";
import { addToSet } from "../fable-library.3.4.0/MapUtil.js";
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

const LitElementUtil_definedElements = new Set([]);

function LitElementUtil_updateStyleSheets(data, litEl, newCSSResults) {
    if ((LitElementUtil_isNotNull(litEl.shadowRoot) ? LitElementUtil_isNotNull(litEl.shadowRoot.adoptedStyleSheets) : false) ? LitElementUtil_isNotNull(newCSSResults) : false) {
        const oldSheets = litEl.shadowRoot.adoptedStyleSheets;
        const updatedSheets = data["updatedSheets"] || (data["updatedSheets"] = (() => (new Set()))()) ;
        if (oldSheets.length === newCSSResults.length) {
            zip(oldSheets, newCSSResults).forEach((tupledArg) => {
                const oldSheet = tupledArg[0];
                const newCSSResult = tupledArg[1];
                const newSheet = newCSSResult.styleSheet;
                if ((LitElementUtil_isNotNull(newCSSResult.cssText) ? LitElementUtil_isNotReferenceEquals(oldSheet, newSheet) : false) ? (!updatedSheets.has(newSheet)) : false) {
                    const pr = oldSheet.replace(newCSSResult.cssText);
                    void pr;
                    void updatedSheets.add(newSheet);
                }
            });
        }
    }
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
    const options = jsOptions((o) => {
        let typ;
        const matchValue = defaultValue;
        let pattern_matching_result;
        if ((typeof matchValue) === "string") {
            pattern_matching_result = 0;
        }
        else if ((typeof matchValue) === "number") {
            pattern_matching_result = 1;
        }
        else if ((typeof matchValue) === "number") {
            pattern_matching_result = 1;
        }
        else if ((typeof matchValue) === "boolean") {
            pattern_matching_result = 2;
        }
        else {
            pattern_matching_result = 3;
        }
        switch (pattern_matching_result) {
            case 0: {
                typ = some(String);
                break;
            }
            case 1: {
                typ = some(Number);
                break;
            }
            case 2: {
                typ = some(Boolean);
                break;
            }
            case 3: {
                typ = (void 0);
                break;
            }
        }
        iterate((v) => {
            o.type = v;
        }, toArray(typ));
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
                    const att_1 = matchValue_1;
                    o.attribute = att_1;
                }
            }
        }, toArray(attribute));
        const matchValue_2 = [fromAttribute, toAttribute];
        let pattern_matching_result_1;
        if (matchValue_2[0] != null) {
            pattern_matching_result_1 = 0;
        }
        else if (matchValue_2[1] != null) {
            pattern_matching_result_1 = 0;
        }
        else {
            pattern_matching_result_1 = 1;
        }
        switch (pattern_matching_result_1) {
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
    });
    return Prop$1_$ctor_4E398B2E(defaultValue, options);
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
        this._hmrSub = (void 0);
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
    get subscribeHmr() {
        const this$ = this;
        return (token) => {
            const matchValue = this$._hmrSub;
            if (matchValue == null) {
                this$._hmrSub = HMRTypes_HMRToken__Subscribe_Z1AE52D65(token, (info) => {
                    const updatedModule = info.NewModule;
                    const updatedExport = updatedModule[this$.name];
                    this$.renderFn = updatedExport.renderFn;
                    LitElementUtil_updateStyleSheets(info.Data, this$, updatedExport.styles);
                });
            }
        };
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
    Decorate(renderFn, mi) {
        const _ = this;
        const config = LitElementInit$1_$ctor();
        const dummyFn = () => {
            throw (new Error(`${_.name} is not immediately callable, it must be created in HTML`));
        };
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
                    let v_1;
                    const k = tupledArg[0];
                    const v = tupledArg[1];
                    let patternInput;
                    const matchValue_1 = v;
                    patternInput = ((matchValue_1 instanceof Prop) ? ((v_1 = matchValue_1, Prop__ToConfig(v_1))) : LitElementUtil_failProps(k));
                    const options = patternInput[1];
                    const defVal = patternInput[0];
                    propsOptions[k] = options;
                    if (!(defVal == null)) {
                        void (propsValues.push([k, defVal]));
                    }
                }, (source2 = Object.values(config_1.props), zip_1(Object.keys(config_1.props), source2)));
                const initProps = (this$) => {
                    iterate((tupledArg_1) => {
                        const k_1 = tupledArg_1[0];
                        const v_2 = tupledArg_1[1];
                        this$[k_1] = v_2;
                    }, propsValues);
                };
                patternInput_1 = [some(propsOptions), initProps];
            }
            else {
                patternInput_1 = [void 0, (_arg1) => {
                }];
            }
            const propsOptions_1 = patternInput_1[0];
            const initProps_1 = patternInput_1[1];
            let classExpr;
            const baseClass = LitHookElement$1;
            const renderRef = createRef();
            renderRef.value = renderFn;
            classExpr = (class extends baseClass {
            constructor() { super(initProps_1) }
            get name() { return name_1(mi); }
            get renderFn() { return renderRef.value; }
            set renderFn(v) {
            renderRef.value = v;
            this.hooks.requestUpdate();
            }
            });
            iterate((props) => {
                Object.defineProperty(classExpr, "properties", { get: (() => props) });
            }, toArray(propsOptions_1));
            iterate((styles_1) => {
                Object.defineProperty(classExpr, "styles", { get: (() => styles_1) });
            }, toArray(styles));
            if (!config_1.useShadowDom) {
                classExpr.prototype.createRenderRoot = function() {
                return this;
                };
            }
            let cacheName;
            if (propsOptions_1 != null) {
                const props_1 = value_2(propsOptions_1);
                cacheName = ((((name_1(mi) + "::") + _.name) + "::") + join(", ", Object.keys(props_1)));
            }
            else {
                cacheName = ((name_1(mi) + "::") + _.name);
            }
            if (!LitElementUtil_definedElements.has(cacheName)) {
                customElements.define(_.name, classExpr);
                void addToSet(cacheName, LitElementUtil_definedElements);
            }
            dummyFn.renderFn = renderFn;
            iterate((styles_2) => {
                dummyFn.styles = styles_2;
            }, toArray(styles));
        })));
        return dummyFn;
    }
}

export function LitElementAttribute$reflection() {
    return class_type("Lit.LitElementAttribute", void 0, LitElementAttribute, class_type("Fable.Core.JS.ReflectedDecoratorAttribute"));
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

