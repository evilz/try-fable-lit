import { class_type } from "../fable-library.3.4.0/Reflection.js";
import { newGuid } from "../fable-library.3.4.0/Guid.js";
import { addToDict } from "../fable-library.3.4.0/MapUtil.js";
import { iterate } from "../fable-library.3.4.0/Seq.js";

export class HMRTypes_HMRToken {
    constructor() {
        this.listeners = (new Map([]));
    }
}

export function HMRTypes_HMRToken$reflection() {
    return class_type("Lit.HMRTypes.HMRToken", void 0, HMRTypes_HMRToken);
}

export function HMRTypes_HMRToken_$ctor() {
    return new HMRTypes_HMRToken();
}

export function HMRTypes_HMRToken__Subscribe_Z1AE52D65(_, handler) {
    const guid = newGuid();
    addToDict(_.listeners, guid, handler);
    return {
        Dispose() {
            void _.listeners.delete(guid);
        },
    };
}

export function HMRTypes_HMRToken__RequestUpdate_4E60E31B(_, newModule) {
    const data = {};
    const info = {
        NewModule: newModule,
        Data: data,
    };
    iterate((handler) => {
        handler(info);
    }, _.listeners.values());
}

export function HMRTypes_HMRToken_Get_Z721C83C5(moduleUrl) {
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
    return dic[moduleUrl_1] || (dic[moduleUrl_1] = (HMRTypes_HMRToken_$ctor)()) ;
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

