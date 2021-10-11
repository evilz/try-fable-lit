import { class_type } from "../fable-library.3.4.0/Reflection.js";
import { render, nothing, svg, html } from "lit-html";
import { transform } from "./Template.fs.js";
import { css as css_1 } from "lit";
import { join } from "../fable-library.3.4.0/String.js";
import { choose } from "../fable-library.3.4.0/Seq.js";
import { cache } from "lit-html/directives/cache.js";
import { repeat } from "lit-html/directives/repeat.js";
import { guard } from "lit-html/directives/guard.js";
import { toArray } from "../fable-library.3.4.0/List.js";
import { until } from "lit-html/directives/until.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ref } from "lit-html/directives/ref.js";

export class LitBindings {
    constructor() {
    }
}

export function LitBindings$reflection() {
    return class_type("Lit.LitBindings", void 0, LitBindings);
}

export const LitHelpers_html = (() => {
    const tag = html;
    return (fmt) => transform(tag, fmt);
})();

export const LitHelpers_svg = (() => {
    const tag = svg;
    return (fmt) => transform(tag, fmt);
})();

export const LitHelpers_css = (() => {
    const tag = css_1;
    return (fmt) => transform(tag, fmt);
})();

export function LitHelpers_inline_css(css) {
    let i2;
    const matchValue = css.indexOf("{") | 0;
    if (matchValue === -1) {
        return css;
    }
    else {
        const i = matchValue | 0;
        const matchValue_1 = css.lastIndexOf("}") | 0;
        if ((i2 = (matchValue_1 | 0), i2 > i)) {
            const i2_1 = matchValue_1 | 0;
            return css.slice(i + 1, (i2_1 - 1) + 1);
        }
        else {
            return css;
        }
    }
}

export class Lit {
    constructor() {
    }
}

export function Lit$reflection() {
    return class_type("Lit.Lit", void 0, Lit);
}

export function Lit_$ctor() {
    return new Lit();
}

export function Lit_get_html() {
    return LitHelpers_html;
}

export function Lit_get_svg() {
    return LitHelpers_svg;
}

export function Lit_get_css() {
    return LitHelpers_css;
}

export function Lit_get_nothing() {
    return nothing;
}

export function Lit_render(el, t) {
    render(t, el);
}

export function Lit_classes_5A743451(classes) {
    return join(" ", choose((tupledArg) => {
        const s = tupledArg[0];
        const b = tupledArg[1];
        if (b) {
            return s;
        }
        else {
            return void 0;
        }
    }, classes));
}

export function Lit_classes_5D66A394(classes) {
    return join(" ", classes);
}

export function Lit_memoize_Z68EA01DD(template) {
    return cache(template);
}

export function Lit_ofSeq_Z6303C434(items) {
    return items;
}

export function Lit_ofList_27069DC9(items) {
    return items;
}

export function Lit_mapUnique(getId, template, items) {
    return repeat(items, getId, (x, _arg1) => template(x));
}

export function Lit_ofLazy(dependencies, view) {
    return guard(toArray(dependencies), view);
}

export function Lit_ofPromise(placeholder, deferred) {
    return until(deferred, placeholder);
}

export function Lit_ofStr_Z721C83C5(v) {
    return v;
}

export function Lit_ofText_Z721C83C5(v) {
    return v;
}

export function Lit_ofInt_Z524259A4(v) {
    return v;
}

export function Lit_ofFloat_5E38073B(v) {
    return v;
}

export function Lit_attrOfOption_2297AD2E(attributeValue) {
    return ifDefined(attributeValue);
}

export function Lit_ref_6E15182A(r) {
    return ref(new (class {
        get value() {
            return r.contents;
        }
        set value(v) {
            r.contents = v;
        }
    }
    )());
}

export function Lit_ref_4A54C547(fn) {
    return ref(fn);
}

export function Browser_Types_EventTarget__EventTarget_get_Value(this$) {
    return this$.value;
}

export function Browser_Types_EventTarget__EventTarget_get_Checked(this$) {
    return this$.checked;
}

