import { Attribute, FSharpRef, Union } from "../fable-library.3.4.0/Types.js";
import { name, int32_type, array_type, union_type, lambda_type, class_type, unit_type } from "../fable-library.3.4.0/Reflection.js";
import { fill } from "../fable-library.3.4.0/Array.js";
import { isDisposable, uncurry, clear, getEnumerator, equals as equals_3, curry, comparePrimitives, max } from "../fable-library.3.4.0/Util.js";
import { value as value_1, defaultArg, some } from "../fable-library.3.4.0/Option.js";
import { iterate, singleton, collect, take, skip, append, delay } from "../fable-library.3.4.0/Seq.js";
import { rangeDouble } from "../fable-library.3.4.0/Range.js";
import { iterate as iterate_1 } from "../fable-library.3.4.0/List.js";
import { HMRToken, HMRToken__Subscribe_61A0B331 } from "./HMR.fs.js";
import { AsyncDirective } from "lit-html/async-directive.js";
import { createRef } from "lit-html/directives/ref.js";
import { directive as directive_1 } from "lit-html/directive.js";

export function HookUtil_createDisposable(f) {
    return {
        Dispose() {
            f();
        },
    };
}

export const HookUtil_emptyDisposable = HookUtil_createDisposable(() => {
});

export function HookUtil_delay(ms, f) {
    void setTimeout(f, ms);
}

export function HookUtil_runAsync(f) {
    HookUtil_delay(0, f);
}

export class HookUtil_Effect extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["OnConnected", "OnRender"];
    }
}

export function HookUtil_Effect$reflection() {
    return union_type("Lit.HookUtil.Effect", [], HookUtil_Effect, () => [[["Item", lambda_type(unit_type, class_type("System.IDisposable"))]], [["Item", lambda_type(unit_type, unit_type)]]]);
}

export class HookUtil_RingState$1 extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Writable", "ReadWritable"];
    }
}

export function HookUtil_RingState$1$reflection(gen0) {
    return union_type("Lit.HookUtil.RingState`1", [gen0], HookUtil_RingState$1, () => [[["wx", array_type(gen0)], ["ix", int32_type]], [["rw", array_type(gen0)], ["wix", int32_type], ["rix", int32_type]]]);
}

export class HookUtil_RingBuffer$1 {
    constructor(size) {
        this.state = (new HookUtil_RingState$1(0, fill(new Array(max((x, y) => comparePrimitives(x, y), size, 10)), 0, max((x, y) => comparePrimitives(x, y), size, 10), null), 0));
    }
}

export function HookUtil_RingBuffer$1$reflection(gen0) {
    return class_type("Lit.HookUtil.RingBuffer`1", [gen0], HookUtil_RingBuffer$1);
}

export function HookUtil_RingBuffer$1_$ctor_Z524259A4(size) {
    return new HookUtil_RingBuffer$1(size);
}

export function HookUtil_RingBuffer$1__Pop(_) {
    const matchValue = _.state;
    if (matchValue.tag === 1) {
        const wix = matchValue.fields[1] | 0;
        const rix = matchValue.fields[2] | 0;
        const items = matchValue.fields[0];
        const rix$0027 = ((rix + 1) % items.length) | 0;
        if (rix$0027 === wix) {
            _.state = (new HookUtil_RingState$1(0, items, wix));
        }
        else {
            _.state = (new HookUtil_RingState$1(1, items, wix, rix$0027));
        }
        return some(items[rix]);
    }
    else {
        return void 0;
    }
}

export function HookUtil_RingBuffer$1__Push_2B595(_, item) {
    const matchValue = _.state;
    if (matchValue.tag === 1) {
        const wix_1 = matchValue.fields[1] | 0;
        const rix = matchValue.fields[2] | 0;
        const items_1 = matchValue.fields[0];
        items_1[wix_1] = item;
        const wix$0027 = ((wix_1 + 1) % items_1.length) | 0;
        if (wix$0027 === rix) {
            _.state = (new HookUtil_RingState$1(1, HookUtil_RingBuffer$1__doubleSize(_, rix, items_1), items_1.length, 0));
        }
        else {
            _.state = (new HookUtil_RingState$1(1, items_1, wix$0027, rix));
        }
    }
    else {
        const ix = matchValue.fields[1] | 0;
        const items = matchValue.fields[0];
        items[ix] = item;
        const wix = ((ix + 1) % items.length) | 0;
        _.state = (new HookUtil_RingState$1(1, items, wix, ix));
    }
}

function HookUtil_RingBuffer$1__doubleSize(this$, ix, items) {
    return Array.from(delay(() => append(skip(ix, items), delay(() => append(take(ix, items), delay(() => collect((matchValue) => singleton(null), rangeDouble(0, 1, items.length))))))));
}

export class TransitionState extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["HasLeft", "AboutToEnter", "Entering", "HasEntered", "Leaving"];
    }
}

export function TransitionState$reflection() {
    return union_type("Lit.TransitionState", [], TransitionState, () => [[], [], [], [], []]);
}

export class TransitionConfig {
    constructor(ms, cssBefore, cssIdle, cssAfter, onComplete) {
        this["ms@94"] = (ms | 0);
        this["cssBefore@94"] = cssBefore;
        this["cssIdle@94"] = cssIdle;
        this["cssAfter@94"] = cssAfter;
        this["onComplete@94"] = onComplete;
    }
}

export function TransitionConfig$reflection() {
    return class_type("Lit.TransitionConfig", void 0, TransitionConfig);
}

export function TransitionConfig_$ctor_7D542EC7(ms, cssBefore, cssIdle, cssAfter, onComplete) {
    return new TransitionConfig(ms, cssBefore, cssIdle, cssAfter, onComplete);
}

export function TransitionConfig__get_ms(_) {
    return _["ms@94"];
}

export function TransitionConfig__get_cssBefore(_) {
    return defaultArg(_["cssBefore@94"], "");
}

export function TransitionConfig__get_cssIdle(_) {
    return defaultArg(_["cssIdle@94"], "");
}

export function TransitionConfig__get_cssAfter(_) {
    const matchValue = [_["cssAfter@94"], _["cssBefore@94"]];
    let pattern_matching_result, v;
    if (matchValue[0] == null) {
        if (matchValue[1] == null) {
            pattern_matching_result = 1;
        }
        else {
            pattern_matching_result = 0;
            v = matchValue[1];
        }
    }
    else {
        pattern_matching_result = 0;
        v = matchValue[0];
    }
    switch (pattern_matching_result) {
        case 0: {
            return v;
        }
        case 1: {
            return "";
        }
    }
}

export function TransitionConfig__onComplete_Z1FBCCD16(_, isIn) {
    const matchValue = _["onComplete@94"];
    if (matchValue == null) {
    }
    else {
        const f = matchValue;
        f(isIn);
    }
}

export class HookContext {
    constructor(host) {
        this.host = host;
        this._firstRun = true;
        this._rendering = false;
        this._stateIndex = 0;
        this._effectIndex = 0;
        this._states = [];
        this._effects = [];
        this._disposables = [];
        this["args@"] = [];
    }
    get args() {
        const __ = this;
        return __["args@"];
    }
    set args(v) {
        const __ = this;
        __["args@"] = v;
    }
    fail() {
        throw (new Error("Hooks must be called consistently for each render call"));
    }
    requestUpdate() {
        const _ = this;
        _.host.requestUpdate();
    }
    render() {
        const this$ = this;
        this$._stateIndex = 0;
        this$._effectIndex = 0;
        this$._rendering = true;
        const res = this$.host.renderFn.apply(this$.host, this$.args);
        if ((!this$._firstRun) ? ((this$._stateIndex !== this$._states.length) ? true : (this$._effectIndex !== this$._effects.length)) : false) {
            this$.fail();
        }
        this$._rendering = false;
        if (this$.host.isConnected) {
            this$.runEffects(this$._firstRun, true);
        }
        this$._firstRun = false;
        return res;
    }
    checkRendering() {
        const this$ = this;
        if (!this$._rendering) {
            this$.fail();
        }
    }
    runEffects(onConnected, onRender) {
        const _ = this;
        HookUtil_runAsync(() => {
            iterate((_arg1) => {
                if (_arg1.tag === 0) {
                    const effect_1 = _arg1.fields[0];
                    if (onConnected) {
                        void (_._disposables.push(effect_1()));
                    }
                }
                else {
                    const effect = _arg1.fields[0];
                    if (onRender) {
                        effect();
                    }
                }
            }, _._effects);
        });
    }
    setState(index, newValue, equals) {
        const this$ = this;
        const equals_2 = (oldValue, newValue_1) => {
            if (curry(2, equals) == null) {
                return equals_3(oldValue, newValue_1);
            }
            else {
                const equals_1 = equals;
                return equals_1(oldValue, newValue_1);
            }
        };
        const oldValue_1 = this$._states[index];
        if (!equals_2(oldValue_1, newValue)) {
            this$._states[index] = newValue;
            if (!this$._rendering) {
                this$.host.requestUpdate();
            }
            else {
                HookUtil_runAsync(() => {
                    this$.host.requestUpdate();
                });
            }
        }
    }
    getState() {
        const this$ = this;
        if (this$._stateIndex >= this$._states.length) {
            this$.fail();
        }
        const idx = this$._stateIndex | 0;
        this$._stateIndex = ((idx + 1) | 0);
        return [idx, this$._states[idx]];
    }
    addState(state) {
        const _ = this;
        void (_._states.push(state));
        return [_._states.length - 1, state];
    }
    disconnect() {
        const _ = this;
        let enumerator = getEnumerator(_._disposables);
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                const disp = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                disp.Dispose();
            }
        }
        finally {
            enumerator.Dispose();
        }
        clear(_._disposables);
    }
    useState(init) {
        const this$ = this;
        this$.checkRendering();
        const patternInput = this$._firstRun ? this$.addState(init()) : this$.getState();
        const state = patternInput[1];
        const index = patternInput[0] | 0;
        return [state, (v) => {
            this$.setState(index, v);
        }];
    }
    useRef(init) {
        const this$ = this;
        this$.checkRendering();
        return this$._firstRun ? this$.addState(new FSharpRef(init()))[1] : this$.getState()[1];
    }
    setEffect(effect) {
        const this$ = this;
        this$.checkRendering();
        if (this$._firstRun) {
            void (this$._effects.push(effect));
        }
        else {
            if (this$._effectIndex >= this$._effects.length) {
                this$.fail();
            }
            const idx = this$._effectIndex | 0;
            this$._effectIndex = ((idx + 1) | 0);
            this$._effects[idx] = effect;
        }
    }
    useEffect(effect) {
        const this$ = this;
        this$.setEffect(new HookUtil_Effect(1, effect));
    }
    useEffectOnce(effect) {
        const this$ = this;
        this$.setEffect(new HookUtil_Effect(0, effect));
    }
    useElmish(init, update) {
        const this$ = this;
        if (this$._firstRun) {
            const exec = (dispatch, cmd) => {
                iterate_1((call) => {
                    call(dispatch);
                }, cmd);
            };
            const patternInput = init();
            const model = patternInput[0];
            const cmd_1 = patternInput[1];
            const patternInput_1 = this$.addState([model, null]);
            const model_1 = patternInput_1[1][0];
            const index = patternInput_1[0] | 0;
            const setState = (model_2, dispatch_1) => {
                this$.setState(index, [model_2, dispatch_1], uncurry(2, (tupledArg) => {
                    const oldModel = tupledArg[0];
                    return (tupledArg_1) => {
                        const newModel = tupledArg_1[0];
                        return equals_3(oldModel, newModel);
                    };
                }));
            };
            const rb = HookUtil_RingBuffer$1_$ctor_Z524259A4(10);
            let reentered = false;
            let state = model_1;
            const dispatch_2 = (msg) => {
                if (reentered) {
                    HookUtil_RingBuffer$1__Push_2B595(rb, msg);
                }
                else {
                    reentered = true;
                    let nextMsg = some(msg);
                    while (nextMsg != null) {
                        const msg_1 = value_1(nextMsg);
                        const patternInput_2 = update(msg_1, state);
                        const model$0027 = patternInput_2[0];
                        const cmd$0027 = patternInput_2[1];
                        setState(model$0027, dispatch_2);
                        exec(dispatch_2, cmd$0027);
                        state = model$0027;
                        nextMsg = HookUtil_RingBuffer$1__Pop(rb);
                    }
                    reentered = false;
                }
            };
            void (this$._effects.push(new HookUtil_Effect(0, () => {
                exec(dispatch_2, cmd_1);
                return {
                    Dispose() {
                        const state_1 = this$._states[index][0];
                        const matchValue = state_1;
                        if (isDisposable(matchValue)) {
                            const disp = matchValue;
                            disp.Dispose();
                        }
                    },
                };
            })));
            this$._states[index] = [state, dispatch_2];
            return [state, dispatch_2];
        }
        else {
            this$._effectIndex = ((this$._effectIndex + 1) | 0);
            return this$.getState()[1];
        }
    }
}

export function HookContext$reflection() {
    return class_type("Lit.HookContext", void 0, HookContext);
}

export function HookContext_$ctor_Z3A7AB6DA(host) {
    return new HookContext(host);
}

export function Lit_Transition__Transition_triggerEnter(this$) {
    this$.trigger(true);
}

export function Lit_Transition__Transition_triggerLeave(this$) {
    this$.trigger(false);
}

export function Lit_HookContext__HookContext_useEffectOnce_3A5B6456(ctx, effect) {
    ctx.useEffectOnce(() => {
        effect();
        return HookUtil_emptyDisposable;
    });
}

export function Lit_HookContext__HookContext_useState_1505(ctx, v) {
    return ctx.useState(() => v);
}

export function Lit_HookContext__HookContext_useRef_1505(ctx, v) {
    return ctx.useRef(() => v);
}

export function Lit_HookContext__HookContext_useRef(ctx) {
    return ctx.useRef(() => (void 0));
}

export function Lit_HookContext__HookContext_useMemo_FCFD9EF(ctx, init) {
    return ctx.useRef(init).contents;
}

export function Lit_HookContext__HookContext_useEffectOnChange_31A5188A(ctx, value, effect) {
    Lit_HookContext__HookContext_useEffectOnChange_C240689(ctx, value, (v) => {
        effect(v);
        return HookUtil_emptyDisposable;
    });
}

export function Lit_HookContext__HookContext_useEffectOnChange_C240689(ctx, value, effect) {
    const prev = Lit_HookContext__HookContext_useRef(ctx);
    ctx.useEffect(() => {
        const matchValue = prev.contents;
        if (matchValue != null) {
            const prevValue = matchValue[0];
            const disp = matchValue[1];
            if (!equals_3(prevValue, value)) {
                disp.Dispose();
                prev.contents = [value, effect(value)];
            }
        }
        else {
            prev.contents = [value, effect(value)];
        }
    });
}

export class HookDirective extends AsyncDirective {
    constructor() {
        super();
        this._hooks = (new HookContext(this));
        this._hmrSub = (void 0);
    }
    requestUpdate() {
        const this$ = this;
        this$.setValue(this$._hooks.render());
    }
    render(...args) {
        const this$ = this;
        this$._hooks.args = args;
        return this$._hooks.render();
    }
    disconnected() {
        const _ = this;
        const matchValue = _._hmrSub;
        if (matchValue != null) {
            const d = matchValue;
            _._hmrSub = (void 0);
            d.Dispose();
        }
        _._hooks.disconnect();
    }
    reconnected() {
        const _ = this;
        _._hooks.runEffects(true, false);
    }
    get subscribeHmr() {
        const this$ = this;
        return (token) => {
            const matchValue = this$._hmrSub;
            if (matchValue == null) {
                this$._hmrSub = HMRToken__Subscribe_61A0B331(token, (updatedModule) => {
                    this$.renderFn = updatedModule[this$.name].renderFn;
                });
            }
        };
    }
    get hooks() {
        const _ = this;
        return _._hooks;
    }
}

export function HookDirective$reflection() {
    return class_type("Lit.HookDirective", void 0, HookDirective, class_type("Lit.AsyncDirective"));
}

export function HookDirective_$ctor() {
    return new HookDirective();
}

export class HookComponentAttribute extends Attribute {
    constructor() {
        super();
    }
    Decorate(renderFn, mi) {
        const renderRef = createRef();
        renderRef.value = renderFn;
        const classExpr = class extends HookDirective {
        constructor() { super() }
        get name() { return name(mi); }
        get renderFn() { return renderRef.value; }
        set renderFn(v) {
        renderRef.value = v;
        this.hooks.requestUpdate();
        }
        };
        const directive = directive_1(classExpr);
        directive.renderFn = renderFn;
        return directive;
    }
}

export function HookComponentAttribute$reflection() {
    return class_type("Lit.HookComponentAttribute", void 0, HookComponentAttribute, class_type("Fable.Core.JS.ReflectedDecoratorAttribute"));
}

export function HookComponentAttribute_$ctor() {
    return new HookComponentAttribute();
}

export class Hook {
    constructor() {
    }
}

export function Hook$reflection() {
    return class_type("Lit.Hook", void 0, Hook);
}

export function Hook_$ctor() {
    return new Hook();
}

export function Hook_getContext_343DAFF1(this$) {
    if ((this$ == null) ? true : (!(this$.hooks instanceof HookContext))) {
        throw (new Error("Cannot access hook context, make sure the hook is called on top of a HookComponent function"));
    }
    return this$.hooks;
}

export function Hook_createDisposable_3A5B6456(f) {
    return HookUtil_createDisposable(f);
}

export function Hook_get_emptyDisposable() {
    return HookUtil_emptyDisposable;
}

export function Hook_useHmr_Z726FBC18(token, this$) {
    const matchValue = [token, this$.subscribeHmr];
    let pattern_matching_result, subscribe, token_1;
    if (matchValue[0] instanceof HMRToken) {
        if (matchValue[1] != null) {
            pattern_matching_result = 0;
            subscribe = matchValue[1];
            token_1 = matchValue[0];
        }
        else {
            pattern_matching_result = 1;
        }
    }
    else {
        pattern_matching_result = 1;
    }
    switch (pattern_matching_result) {
        case 0: {
            subscribe(token_1);
            break;
        }
        case 1: {
            break;
        }
    }
}

export function Hook_useTransition_Z2EF5F687(ctx, transition) {
    const patternInput = Lit_HookContext__HookContext_useState_1505(ctx, new TransitionState(1));
    const state = patternInput[0];
    const setState = patternInput[1];
    const trigger = (isIn) => {
        const patternInput_1 = isIn ? [new TransitionState(2), new TransitionState(3)] : [new TransitionState(4), new TransitionState(0)];
        const middleState = patternInput_1[0];
        const finalState = patternInput_1[1];
        HookUtil_delay(TransitionConfig__get_ms(transition), () => {
            setState(finalState);
            TransitionConfig__onComplete_Z1FBCCD16(transition, isIn);
        });
        setState(middleState);
    };
    Lit_HookContext__HookContext_useEffectOnChange_31A5188A(ctx, state, (_arg1) => {
        if (_arg1.tag === 1) {
            trigger(true);
        }
    });
    return new (class {
        get css() {
            return (`transition-duration: ${TransitionConfig__get_ms(transition)}ms; `) + ((state.tag === 1) ? TransitionConfig__get_cssBefore(transition) : ((state.tag === 2) ? TransitionConfig__get_cssIdle(transition) : ((state.tag === 3) ? TransitionConfig__get_cssIdle(transition) : ((state.tag === 4) ? TransitionConfig__get_cssAfter(transition) : TransitionConfig__get_cssBefore(transition)))));
        }
        get state() {
            return state;
        }
        get isRunning() {
            return (state.tag === 2) ? true : ((state.tag === 4) ? true : ((state.tag === 3) ? false : ((state.tag === 0) ? false : true)));
        }
        get hasLeft() {
            return (state.tag === 0) ? true : false;
        }
        trigger(isIn_1) {
            if (isIn_1) {
                setState(new TransitionState(1));
            }
            else {
                trigger(false);
            }
        }
    }
    )();
}

