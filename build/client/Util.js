import { some } from "./fable_modules/fable-library.3.4.0/Option.js";
import { ProgramModule_map } from "./fable_modules/Fable.Elmish.3.1.0/program.fs.js";
import { curry, uncurry } from "./fable_modules/fable-library.3.4.0/Util.js";

export function StorageUtil_mapInit(decode, storageKey, init, unitVar0) {
    const patternInput = init();
    const defaultModel = patternInput[0];
    const cmd = patternInput[1];
    const matchValue = localStorage.getItem(storageKey);
    if (matchValue === null) {
        return [defaultModel, cmd];
    }
    else {
        const json = matchValue;
        try {
            const stored = decode(json);
            return [stored, cmd];
        }
        catch (e) {
            console.warn(some(`Cannot decode localStorage '${storageKey}'`), e.message);
            return [defaultModel, cmd];
        }
    }
}

export function StorageUtil_mapUpdate(encode, storageKey, update, msg, model) {
    const patternInput = update(msg, model);
    const newModel = patternInput[0];
    const cmd = patternInput[1];
    localStorage.setItem(storageKey, encode(newModel));
    return [newModel, cmd];
}

export function Program_withLocalStorage(encode, decode, storageKey, program) {
    return ProgramModule_map((init, arg30$0040) => StorageUtil_mapInit(decode, storageKey, init, void 0), (update, msg, model) => StorageUtil_mapUpdate(encode, storageKey, update, msg, model), uncurry(3, (x) => curry(2, x)), uncurry(3, (x_1) => curry(2, x_1)), uncurry(2, (x_2) => x_2), program);
}

