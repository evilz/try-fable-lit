import { Record, FSharpRef } from "./fable_modules/fable-library.3.4.0/Types.js";
import { record_type, bool_type, string_type, unit_type, MethodInfo, class_type } from "./fable_modules/fable-library.3.4.0/Reflection.js";
import { Prop_Of_6B8EFA6B, LitElementAttribute } from "./fable_modules/Fable.Lit.1.3.0/LitElement.fs.js";
import { Lit_mapUnique, Browser_Types_EventTarget__EventTarget_get_Value, LitHelpers_css, LitHelpers_html } from "./fable_modules/Fable.Lit.1.3.0/Lit.fs.js";
import { fmt } from "./fable_modules/fable-library.3.4.0/String.js";
import { length, filter, cons, ofArray, singleton } from "./fable_modules/fable-library.3.4.0/List.js";
import { fadeOut, flyBelow, animate } from "https://unpkg.com/@lit-labs/motion@1.0.1/index.js?module";

export class MouseController {
    constructor() {
        this.self = (new FSharpRef(null));
        const self = this.self;
        this.self.contents = this;
        this.pos = {
            x: 0,
            y: 0,
        };
        this["init@19"] = 1;
    }
}

export function MouseController$reflection() {
    return class_type("Lit.TodoMVC.App.MouseController", void 0, MouseController);
}

export function MouseController_$ctor() {
    return new MouseController();
}

export function MouseController__get_Pos(this$) {
    return this$.pos;
}

export function MouseController__set_Pos_Z57CCE2E1(this$, value) {
    this$.pos = value;
}

export function MouseController__SetHost_Z5E8026B(this$, host) {
    this$.host = host;
    return this$.host.addController(this$.self.contents);
}

export function MouseController__OnMouseMove_Z5B3E8D2(this$, e) {
    const e_1 = e;
    MouseController__set_Pos_Z57CCE2E1(this$, {
        x: e_1.clientX,
        y: e_1.clientY,
    });
    this$.host.requestUpdate();
}

export const MousePos = (new LitElementAttribute("mouse-pos")).Decorate(function () {
    const patternInput = (this).init((arg) => {
        let a;
        a = (arg.props = {
            mouse: Prop_Of_6B8EFA6B({
                controller: MouseController_$ctor(),
            }),
        });
        return Promise.resolve(undefined);
    });
    const props = patternInput[1];
    const host = patternInput[0];
    MouseController__SetHost_Z5E8026B((props.mouse).controller, host);
    return LitHelpers_html(fmt`
    <h3>The mouse is at:</h3>
    <pre>
    x: ${MouseController__get_Pos((props.mouse).controller).x}
    y: ${MouseController__get_Pos((props.mouse).controller).y}
    </pre>
    `);
}, new MethodInfo("MousePos", [["arg0", unit_type]], class_type("Lit.TemplateResult")));

export class ToDoItem extends Record {
    constructor(Text$, Completed) {
        super();
        this.Text = Text$;
        this.Completed = Completed;
    }
}

export function ToDoItem$reflection() {
    return record_type("Lit.TodoMVC.App.ToDoItem", [], ToDoItem, () => [["Text", string_type], ["Completed", bool_type]]);
}

export const styles = singleton(LitHelpers_css(fmt`
.completed {
text-decoration-line: line-through;
color: #777;
}`));

export const ToDoList = (new LitElementAttribute("todo-list")).Decorate(function () {
    const patternInput = (this).init((arg) => {
        let listItems;
        let a;
        const init = arg;
        init.styles = styles;
        init.useShadowDom;
        a = (init.props = ((listItems = Prop_Of_6B8EFA6B(ofArray([new ToDoItem("Start Lit tutorial", true), new ToDoItem("Make to-do list", false)])), {
            hideCompleted: Prop_Of_6B8EFA6B(false),
            listItems: listItems,
        })));
        return Promise.resolve(undefined);
    });
    const props = patternInput[1];
    const host = patternInput[0];
    const input = () => host.renderRoot.querySelector("#newitem");
    const addToDo = (event) => {
        const input_1 = input();
        props.listItems = cons(new ToDoItem(Browser_Types_EventTarget__EventTarget_get_Value(input_1), false), props.listItems);
        input_1.value = "";
        host.requestUpdate();
    };
    const toggleCompleted = (item) => {
        item.Completed = (!item.Completed);
        host.requestUpdate();
    };
    const getItemTemplate = (item_1) => LitHelpers_html(fmt`<li ${animate({
        in: singleton((obj) => {
            flyBelow(obj);
        }),
        out: singleton((obj_1) => {
            fadeOut(obj_1);
        }),
        stabilizeOut: true,
    })} class=${(item_1.Completed ? "completed" : "")}
    @click=${((_arg1) => {
        toggleCompleted(item_1);
    })}>${item_1.Text}</li>`);
    const setHideCompleted = (e) => {
        props.hideCompleted = e.target.checked;
    };
    const items = (props.hideCompleted) ? filter((item_2) => (!item_2.Completed), props.listItems) : (props.listItems);
    const caughtUpMessage = LitHelpers_html(fmt`
    <p>
    You're all caught up!
    </p>
    `);
    const todos = LitHelpers_html(fmt`<ul >
    ${Lit_mapUnique((item_3) => item_3.Text, getItemTemplate, items)}
    <!-- TODO: Render list items. -->
    </ul>
    `);
    const todosOrMessage = (length(items) > 0) ? todos : caughtUpMessage;
    return LitHelpers_html(fmt`
    <h2>To Do</h2>
    ${todosOrMessage}
    <input id="newitem" aria-label="New item" @keypress=${((e_1) => {
        if (e_1.key === "Enter") {
            addToDo(e_1);
        }
    })}>
    <button @click=${addToDo}>Add</button>
    <br>
    <label>
    <input type="checkbox"
    @change=${setHideCompleted}
    ?checked=${props.hideCompleted}>
    Hide completed
    </label>
    `);
}, new MethodInfo("ToDoList", [["arg0", unit_type]], class_type("Lit.TemplateResult")));

