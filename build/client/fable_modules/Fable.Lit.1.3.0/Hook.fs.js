import { Attribute, FSharpRef, Union } from "../fable-library.3.4.0/Types.js";
import { union_type, lambda_type, class_type, unit_type } from "../fable-library.3.4.0/Reflection.js";
import { defaultArg } from "../fable-library.3.4.0/Option.js";
import { equalsWith } from "../fable-library.3.4.0/Array.js";
import { clear, getEnumerator, equals as equals_3, curry, compare } from "../fable-library.3.4.0/Util.js";
import { iterate } from "../fable-library.3.4.0/Seq.js";
import { noChange } from "lit-html";
import { AsyncDirective } from "lit-html/async-directive.js";
import { directive } from "lit-html/directive.js";

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
        this["ms@53"] = (ms | 0);
        this["cssBefore@53"] = cssBefore;
        this["cssIdle@53"] = cssIdle;
        this["cssAfter@53"] = cssAfter;
        this["onComplete@53"] = onComplete;
    }
}

export function TransitionConfig$reflection() {
    return class_type("Lit.TransitionConfig", void 0, TransitionConfig);
}

export function TransitionConfig_$ctor_7D542EC7(ms, cssBefore, cssIdle, cssAfter, onComplete) {
    return new TransitionConfig(ms, cssBefore, cssIdle, cssAfter, onComplete);
}

export function TransitionConfig__get_ms(_) {
    return _["ms@53"];
}

export function TransitionConfig__get_cssBefore(_) {
    return defaultArg(_["cssBefore@53"], "");
}

export function TransitionConfig__get_cssIdle(_) {
    return defaultArg(_["cssIdle@53"], "");
}

export function TransitionConfig__get_cssAfter(_) {
    const matchValue = [_["cssAfter@53"], _["cssBefore@53"]];
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
    const matchValue = _["onComplete@53"];
    if (matchValue == null) {
    }
    else {
        matchValue(isIn);
    }
}

export class HookContext {
    constructor(host) {
        this.host = host;
        this._firstRun = true;
        this._rendering = false;
        this._args = [];
        this._stateIndex = 0;
        this._effectIndex = 0;
        this._states = [];
        this._effects = [];
        this._disposables = [];
    }
    fail() {
        throw (new Error("Hooks must be called consistently for each render call"));
    }
    requestUpdate() {
        const _ = this;
        _.host.requestUpdate();
    }
    renderWith(args) {
        const this$ = this;
        if (this$._firstRun ? true : (!equalsWith((x, y) => compare(x, y), args, this$._args))) {
            this$._args = args;
            return this$.render();
        }
        else {
            return void 0;
        }
    }
    render() {
        const this$ = this;
        this$._stateIndex = 0;
        this$._effectIndex = 0;
        this$._rendering = true;
        const res = this$.host.renderFn.apply(this$.host, this$._args);
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
                    if (onConnected) {
                        void (_._disposables.push(_arg1.fields[0]()));
                    }
                }
                else if (onRender) {
                    _arg1.fields[0]();
                }
            }, _._effects);
        });
    }
    setState(index, newValue, equals) {
        let newValue_1, oldValue;
        const _ = this;
        if (!((newValue_1 = newValue, (oldValue = _._states[index], (curry(2, equals) == null) ? equals_3(oldValue, newValue_1) : equals(oldValue, newValue_1))))) {
            _._states[index] = newValue;
            if (!_._rendering) {
                _.host.requestUpdate();
            }
            else {
                HookUtil_runAsync(() => {
                    _.host.requestUpdate();
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
                enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]().Dispose();
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
        return [patternInput[1], (v) => {
            this$.setState(patternInput[0], v);
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

export function Lit_HookContext__HookContext_useEffectOnce_3A5B6456(ctx, effect) {
    ctx.useEffectOnce(() => {
        effect();
        return HookUtil_emptyDisposable;
    });
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
            const disp = matchValue[1];
            if (!equals_3(matchValue[0], value)) {
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
    }
    requestUpdate() {
        const this$ = this;
        this$.setValue(this$._hooks.render());
    }
    render(...args) {
        const _ = this;
        const matchValue = _._hooks.renderWith(args);
        return (matchValue == null) ? noChange : matchValue;
    }
    disconnected() {
        const _ = this;
        _._hooks.disconnect();
    }
    reconnected() {
        const _ = this;
        _._hooks.runEffects(true, false);
    }
    get hooks() {
        const _ = this;
        return _._hooks;
    }
}

export function HookDirective$reflection() {
    return class_type("Lit.HookDirective", void 0, HookDirective, class_type("Lit.Types.AsyncDirective"));
}

export function HookDirective_$ctor() {
    return new HookDirective();
}

export class HookComponentAttribute extends Attribute {
    constructor() {
        super();
    }
    Decorate(renderFn) {
        return directive(class extends HookDirective {
        constructor() { super() }
        get renderFn() { return renderFn }
        });
    }
}

export function HookComponentAttribute$reflection() {
    return class_type("Lit.HookComponentAttribute", void 0, HookComponentAttribute, class_type("Fable.Core.JS.DecoratorAttribute"));
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

export function Hook_useHmr_ZF11B4D8(token, this$) {
}

export function Hook_useTransition_Z2EF5F687(ctx, transition) {
    const patternInput = Lit_HookContext__HookContext_useState_1505(ctx, new TransitionState(1));
    const state = patternInput[0];
    const setState = patternInput[1];
    const trigger = (isIn) => {
        const patternInput_1 = isIn ? [new TransitionState(2), new TransitionState(3)] : [new TransitionState(4), new TransitionState(0)];
        HookUtil_delay(TransitionConfig__get_ms(transition), () => {
            setState(patternInput_1[1]);
            TransitionConfig__onComplete_Z1FBCCD16(transition, isIn);
        });
        setState(patternInput_1[0]);
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

