import { class_type } from "../fable-library.3.4.0/Reflection.js";
import { newGuid } from "../fable-library.3.4.0/Guid.js";
import { addToDict } from "../fable-library.3.4.0/MapUtil.js";
import { iterate } from "../fable-library.3.4.0/Seq.js";

export class HMRToken {
    constructor() {
        this.listeners = (new Map([]));
    }
}

export function HMRToken$reflection() {
    return class_type("Lit.HMRToken", void 0, HMRToken);
}

export function HMRToken_$ctor() {
    return new HMRToken();
}

export function HMRToken__Subscribe_61A0B331(_, handler) {
    const guid = newGuid();
    addToDict(_.listeners, guid, handler);
    return {
        Dispose() {
            void _.listeners.delete(guid);
        },
    };
}

export function HMRToken__RequestUpdate_4E60E31B(_, newModule) {
    iterate((handler) => {
        handler(newModule);
    }, _.listeners.values());
}

export function HMRToken_Get_Z721C83C5(moduleUrl) {
    let moduleUrl_1;
    const matchValue = moduleUrl.indexOf("?") | 0;
    if (matchValue === -1) {
        moduleUrl_1 = moduleUrl;
    }
    else {
        const i = matchValue | 0;
        moduleUrl_1 = moduleUrl.slice(void 0, (i - 1) + 1);
    }
    const dic = window["__FABLE_LIT_HMR__"] || (window["__FABLE_LIT_HMR__"] = (() => ({}))()) ;
    return dic[moduleUrl_1] || (dic[moduleUrl_1] = (HMRToken_$ctor)()) ;
}

export class HMR {
    constructor() {
    }
}

export function HMR$reflection() {
    return class_type("Lit.HMR", void 0, HMR);
}

export function HMR_get_hot() {
    return {};
}

export function HMR_get_webpackHot() {
    return {};
}

