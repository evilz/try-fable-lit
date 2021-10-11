import { HMRToken__RequestUpdate_4E60E31B, HMRToken_Get_Z721C83C5, HMR_get_hot } from "./fable_modules/Fable.Lit.1.1.0/HMR.fs.js";
import { equals } from "./fable_modules/fable-library.3.4.0/Util.js";
import { toArray, some } from "./fable_modules/fable-library.3.4.0/Option.js";
import { iterate } from "./fable_modules/fable-library.3.4.0/Seq.js";
import { Lit_Transition__Transition_triggerLeave, TransitionConfig_$ctor_7D542EC7, Hook_useTransition_Z2EF5F687, Lit_HookContext__HookContext_useEffectOnChange_31A5188A, Hook_getContext_343DAFF1, Hook_useHmr_Z726FBC18, HookComponentAttribute } from "./fable_modules/Fable.Lit.1.1.0/Hook.fs.js";
import { Todo$reflection, Todo, Msg$reflection, Msg } from "./Types.js";
import { Lit_classes_5A743451, LitHelpers_inline_css, Lit_ref_6E15182A, LitHelpers_html } from "./fable_modules/Fable.Lit.1.1.0/Lit.fs.js";
import { fmt } from "./fable_modules/fable-library.3.4.0/String.js";
import { option_type, class_type, lambda_type, unit_type, MethodInfo } from "./fable_modules/fable-library.3.4.0/Reflection.js";
import { animate } from "@lit-labs/motion";

const Util_hmr = (() => {
    let token = null;
    if (import.meta.hot) {
        token = HMRToken_Get_Z721C83C5(import.meta.url);
        import.meta.hot.accept(((newModule) => {
            if (equals(void 0, false)) {
                import.meta.hot.invalidate();
            }
            else {
                try {
                    const newModule_1 = ("module" in newModule) ? (newModule["module"]) : newModule;
                    HMRToken__RequestUpdate_4E60E31B(token, newModule_1);
                }
                catch (e) {
                    console.warn(some("[HMR]"), e);
                    import.meta.hot.invalidate();
                }
            }
        }));
    }
    return token;
})();

function Util_onEnterOrEscape(onEnter, onEscape, ev) {
    const ev_1 = ev;
    const matchValue = ev_1.key;
    switch (matchValue) {
        case "Enter": {
            onEnter(ev_1);
            break;
        }
        case "Escape": {
            onEscape(ev_1);
            break;
        }
        default: {
        }
    }
}

function Microsoft_FSharp_Core_FSharpOption$1__Option$1_Iter_Z7D5D6F51(this$, f) {
    iterate(f, toArray(this$));
}

export const NewTodoEl = (new HookComponentAttribute()).Decorate(function (dispatch) {
    Hook_useHmr_Z726FBC18(Util_hmr, this);
    const inputRef = Hook_getContext_343DAFF1(this).useRef(() => (void 0));
    const addNewTodo = (_arg1) => {
        const matchValue = inputRef.contents;
        if (matchValue != null) {
            const input = matchValue;
            const value = input.value;
            input.value = "";
            const matchValue_1 = value.trim();
            if (matchValue_1 === "") {
            }
            else {
                const v = matchValue_1;
                dispatch(new Msg(1, v));
            }
        }
    };
    return LitHelpers_html(fmt`
    <div class="field has-addons">
    <div class="control is-expanded">
    <input class="input is-medium"
    type="text"
    aria-label="New todo description"
    ${Lit_ref_6E15182A(inputRef)}
    @keyup=${((ev) => {
        Util_onEnterOrEscape(addNewTodo, (value_1) => {
        }, ev);
    })}>
    </div>
    <div class="control">
    <button class="button is-primary is-medium"
    aria-label="Add new todo"
    @click=${addNewTodo}>
    <i role="img" class="bi-plus-lg"></i>
    </button>
    </div>
    </div>
    `);
}, new MethodInfo("NewTodoEl", [["dispatch", lambda_type(Msg$reflection(), unit_type)]], class_type("Lit.TemplateResult")));

export const TodoEl = (new HookComponentAttribute()).Decorate(function (dispatch, edit, todo) {
    Hook_useHmr_Z726FBC18(Util_hmr, this);
    let isEditing;
    if (edit == null) {
        isEditing = false;
    }
    else {
        const edit_1 = edit;
        isEditing = (edit_1.Id === todo.Id);
    }
    const hasFocus = Hook_getContext_343DAFF1(this).useRef(() => false);
    const inputRef = Hook_getContext_343DAFF1(this).useRef(() => (void 0));
    Lit_HookContext__HookContext_useEffectOnChange_31A5188A(Hook_getContext_343DAFF1(this), isEditing, (_arg1) => {
        let pattern_matching_result;
        if (_arg1) {
            if (!hasFocus.contents) {
                pattern_matching_result = 0;
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
                Microsoft_FSharp_Core_FSharpOption$1__Option$1_Iter_Z7D5D6F51(inputRef.contents, (i) => {
                    i.select();
                });
                break;
            }
            case 1: {
                break;
            }
        }
    });
    let transition;
    const cssBefore = LitHelpers_inline_css(".{\n                opacity: 0;\n                transform: scale(2);\n            }");
    const cssAfter = LitHelpers_inline_css(".{\n                opacity: 0;\n                transform: scale(0.1);\n            }");
    transition = Hook_useTransition_Z2EF5F687(Hook_getContext_343DAFF1(this), TransitionConfig_$ctor_7D542EC7(500, cssBefore, void 0, cssAfter, (isIn) => {
        if (!isIn) {
            dispatch(new Msg(2, todo.Id));
        }
    }));
    const style = transition.css + LitHelpers_inline_css(".{\n        border: 2px solid lightgray;\n        border-radius: 10px;\n        margin: 5px 0;\n    }");
    if (isEditing) {
        const applyEdit = (_arg2) => {
            Microsoft_FSharp_Core_FSharpOption$1__Option$1_Iter_Z7D5D6F51(inputRef.contents, (input) => {
                dispatch(new Msg(5, new Todo(todo.Id, input.value.trim(), todo.Completed)));
            });
        };
        const cancelEdit = (_arg3) => {
            dispatch(new Msg(5, void 0));
        };
        return LitHelpers_html(fmt`
        <div class="columns" style=${style}>
        <div class="column is-10">
        <input class="input"
        type="text"
        aria-label="Edit todo"
        ${Lit_ref_6E15182A(inputRef)}
        value=${todo.Description}
        @keyup=${((ev) => {
            Util_onEnterOrEscape(applyEdit, cancelEdit, ev);
        })}
        @blur=${cancelEdit}>
        </div>
        <div class="column is-2">
        <button class="button is-primary" aria-label="Save edit"
        @click=${applyEdit}>
        <i role="img" class="bi-save"></i>
        </button>
        </div>
        </div>`);
    }
    else {
        return LitHelpers_html(fmt`
        <div ${animate()} class="columns" style=${style}>
        <div class="column is-9">
        <p class="subtitle"
        style="cursor: pointer; user-select: none"
        @dblclick=${((_arg1_1) => {
            dispatch(new Msg(4, todo));
        })}>
        ${todo.Description}
        </p>
        </div>
        <div class="column is-3">
        <button class=${Lit_classes_5A743451([["button", true], ["is-success", todo.Completed]])}
        aria-label=${(todo.Completed ? "Mark uncompleted" : "Mark completed")}
        @click=${((_arg2_1) => {
            dispatch(new Msg(3, todo.Id));
        })}>
        <i role="img" class="bi-check-lg"></i>
        </button>
        <button class="button is-primary" aria-label="Edit"
        @click=${((_arg3_1) => {
            dispatch(new Msg(4, todo));
        })}>
        <i role="img" class="bi-pencil"></i>
        </button>
        <button class="button is-danger" aria-label="Delete"
        @click=${((_arg4) => {
            Lit_Transition__Transition_triggerLeave(transition);
        })}>
        <i role="img" class="bi-trash"></i>
        </button>
        </div>
        </div>
        `);
    }
}, new MethodInfo("TodoEl", [["dispatch", lambda_type(Msg$reflection(), unit_type)], ["edit", option_type(Todo$reflection())], ["todo", Todo$reflection()]], class_type("Lit.TemplateResult")));

