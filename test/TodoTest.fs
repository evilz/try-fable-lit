module TodoTest

open Expect
open Expect.Dom
open Expect.Elmish
open WebTestRunner
open Lit.TodoMVC

App.register()

describe "Todo" <| fun () ->
    // Test the Elmish app without UI
    it "TodoApp Elmish" <| fun () -> promise {
        // Start the Elmish app without UI and get a handler
        // to access the model and dispatch messages
        use app =
            Program.mkHidden App.init App.update
            |> Program.runTest

        AddNewTodo "Elmish test" |> app.Dispatch
        app.Model.Todos
        |> Expect.find "new todo" (fun t -> t.Description = "Elmish test")
        |> Expect.isFalse "completed" (fun t -> t.Completed)
    }

    // Test the UI (running Elmish underneath)
    it "TodoApp UI" <| fun () -> promise {
        use! container = render_html $"<todo-app></todo-app>"

        let el = container.El
        let newTodo = "Elmish test"
        el |> Expect.error "new todo before adding" (fun el -> el.getByText(newTodo))

        // We can get the form elements using the aria labels, same way as screen readers will do
        el.getTextInput("New todo description").value <- newTodo
        el.getButton("Add new todo").click()

        // Await for the element to update
        do! elementUpdated el

        el |> Expect.success "new todo found" (fun el -> el.getByText(newTodo))
        do! el |> Expect.matchHtmlSnapshot "new-todo"
    }
