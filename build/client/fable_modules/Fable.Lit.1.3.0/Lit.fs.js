import { class_type } from "../fable-library.3.4.0/Reflection.js";
import { render, nothing, svg, html } from "lit-html";
import { transform } from "./Template.fs.js";
import { css as css_1 } from "lit";
import { join } from "../fable-library.3.4.0/String.js";
import { choose } from "../fable-library.3.4.0/Seq.js";
import { repeat } from "lit-html/directives/repeat.js";
import { until } from "lit-html/directives/until.js";
import { defaultArg } from "../fable-library.3.4.0/Option.js";
import { guard } from "lit-html/directives/guard.js";
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
    const matchValue = css.indexOf("{") | 0;
    if (matchValue === -1) {
        return css;
    }
    else {
        const i = matchValue | 0;
        const matchValue_1 = css.lastIndexOf("}") | 0;
        if (matchValue_1 > i) {
            return css.slice(i + 1, (matchValue_1 - 1) + 1);
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
        if (tupledArg[1]) {
            return tupledArg[0];
        }
        else {
            return void 0;
        }
    }, classes));
}

export function Lit_classes_5D66A394(classes) {
    return join(" ", classes);
}

export function Lit_mapUnique(getId, template, items) {
    return repeat(items, getId, (x, _arg1) => template(x));
}

export function Lit_ofPromise_79CBC0DD(template, placeholder) {
    return until(template, defaultArg(placeholder, Lit_get_nothing()));
}

export function Lit_onChange_3816F95(dependency, template) {
    return guard(Array.isArray(dependency) ? dependency : [dependency], () => template(dependency));
}

export function Lit_onChange_Z15DFCF7D(dependency1, dependency2, template) {
    return guard([dependency1, dependency2], () => template(dependency1, dependency2));
}

export function Lit_onChange_749DB675(dependency1, dependency2, dependency3, template) {
    return guard([dependency1, dependency2, dependency3], () => template(dependency1, dependency2, dependency3));
}

export function Lit_onChange_Z4F81DE9D(dependency1, dependency2, dependency3, dependency4, template) {
    return guard([dependency1, dependency2, dependency3, dependency4], () => template(dependency1, dependency2, dependency3, dependency4));
}

export function Lit_ifSome_2297AD2E(attributeValue) {
    return ifDefined(attributeValue);
}

export function Lit_refValue_6E15182A(r) {
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

export function Lit_refCallback_4A54C547(fn) {
    return ref(fn);
}

export function Browser_Types_EventTarget__EventTarget_get_Value(this$) {
    return this$.value;
}

export function Browser_Types_EventTarget__EventTarget_get_Checked(this$) {
    return this$.checked;
}

