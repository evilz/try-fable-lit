import { Union, Record } from "./fable_modules/fable-library.3.4.0/Types.js";
import { union_type, option_type, list_type, record_type, bool_type, string_type, class_type } from "./fable_modules/fable-library.3.4.0/Reflection.js";
import { newGuid } from "./fable_modules/fable-library.3.4.0/Guid.js";

export class Todo extends Record {
    constructor(Id, Description, Completed) {
        super();
        this.Id = Id;
        this.Description = Description;
        this.Completed = Completed;
    }
}

export function Todo$reflection() {
    return record_type("Lit.TodoMVC.Todo", [], Todo, () => [["Id", class_type("System.Guid")], ["Description", string_type], ["Completed", bool_type]]);
}

export function Todo_New_Z721C83C5(description) {
    return new Todo(newGuid(), description, false);
}

export class State extends Record {
    constructor(Todos, Edit, Sort) {
        super();
        this.Todos = Todos;
        this.Edit = Edit;
        this.Sort = Sort;
    }
}

export function State$reflection() {
    return record_type("Lit.TodoMVC.State", [], State, () => [["Todos", list_type(Todo$reflection())], ["Edit", option_type(Todo$reflection())], ["Sort", bool_type]]);
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["ToggleSort", "AddNewTodo", "DeleteTodo", "ToggleCompleted", "StartEdit", "FinishEdit"];
    }
}

export function Msg$reflection() {
    return union_type("Lit.TodoMVC.Msg", [], Msg, () => [[], [["description", string_type]], [["Item", class_type("System.Guid")]], [["Item", class_type("System.Guid")]], [["Item", Todo$reflection()]], [["Item", option_type(Todo$reflection())]]]);
}

