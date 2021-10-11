module Lit.TodoMVC.App

open Lit
open Browser.Types
open Browser
open Fable.Core.JsInterop
open Fable.Core

[<Import("animate", from = "https://unpkg.com/@lit-labs/motion@1.0.1/index.js?module")>]
let animate (obj) : unit = jsNative

[<Import("flyBelow", from = "https://unpkg.com/@lit-labs/motion@1.0.1/index.js?module")>]
let flyBelow (obj) : unit = jsNative

[<Import("fadeOut", from = "https://unpkg.com/@lit-labs/motion@1.0.1/index.js?module")>]
let fadeOut (obj) : unit = jsNative


type MouseController() as self =
    [<DefaultValue>]
    val mutable host: LitElement

    // private mutable value
    let mutable pos = {| x = 0.0; y = 0.0 |}



    member this.Pos
        with get () = pos
        and set (value) = pos <- value

    //   host;
//   pos = {x: 0, y: 0};

    member this.SetHost(host: LitElement) =
        this.host <- host
        this.host?addController (self)
    //window.addEventListener ("mousemove", this.OnMouseMove)

    member this.OnMouseMove(e: Event) =
        let e = e :?> MouseEvent
        this.Pos <- {| x = e.clientX; y = e.clientY |}
        this.host.requestUpdate ()

// member this.hostConnected() =
//     window.addEventListener ("mousemove", this.OnMouseMove)


[<LitElement("mouse-pos")>]
let MousePos () =


    //let mutable h: obj = null
    // This call is obligatory to initialize the web component
    let host, props =
        LitElement.init
            (fun init ->
                //let mutable h: obj = null
                //let mouse = MouseController(h :?> LitElement)
                init.props <- {| mouse = Prop.Of({| controller = MouseController() |}) |})

    //h <- host

    props.mouse.Value.controller.SetHost(host)

    html
        $"""
        <h3>The mouse is at:</h3>
        <pre>
          x: {props.mouse.Value.controller.Pos.x}
          y: {props.mouse.Value.controller.Pos.y}
        </pre>
        """

type ToDoItem =
    { Text: string
      mutable Completed: bool }

let styles =
    [ css
          $"""
        .completed {{
        text-decoration-line: line-through;
        color: #777;
                }}""" ]

[<LitElement("todo-list")>]
let ToDoList () =

    // This call is obligatory to initialize the web component
    let host, props =
        LitElement.init
            (fun init ->
                init.styles <- styles
                init.useShadowDom

                init.props <-
                    {| listItems =
                           Prop.Of(
                               [ { Text = "Start Lit tutorial"
                                   Completed = true }
                                 { Text = "Make to-do list"
                                   Completed = false } ]
                           )
                       hideCompleted = Prop.Of(false) |})

    let input () : HTMLInputElement =
        host.renderRoot.querySelector ("#newitem") :?> HTMLInputElement

    let addToDo (event: Event) =
        //let input = event.target
        //props.firstname.Value <- input.Value
        let input = input ()

        props.listItems.Value <-
            { Text = input.Value
              Completed = false }
            :: props.listItems.Value

        input.value <- ""
        host.requestUpdate ()

    let toggleCompleted (item: ToDoItem) =
        item.Completed <- not item.Completed
        host.requestUpdate ()



    let getItemTemplate item =
        html
            $"""<li {animate (
                         {| ``in`` = [ flyBelow ]
                            out = [ fadeOut ]
                            stabilizeOut = true |}

                     )} class={if item.Completed then
                                   "completed"
                               else
                                   ""}
                           @click={fun _ -> toggleCompleted (item)}>{item.Text}</li>"""

    let setHideCompleted (e: Event) =
        props.hideCompleted.Value <- (e.target :?> HTMLInputElement).``checked``


    let items =
        if props.hideCompleted.Value then
            props.listItems.Value
            |> List.filter (fun item -> not item.Completed)
        else
            props.listItems.Value

    let caughtUpMessage =
        html
            $"""
            <p>
            You're all caught up!
            </p>
            """

    let todos =
        html
            $"""<ul >
            {items
             |> Lit.mapUnique (fun item -> item.Text) getItemTemplate}
            <!-- TODO: Render list items. -->
         </ul>
          """

    let todosOrMessage =
        if items.Length > 0 then
            todos
        else
            caughtUpMessage

    html
        $"""
          <h2>To Do</h2>
          {todosOrMessage}
          <input id="newitem" aria-label="New item" @keypress={fun (e: KeyboardEvent) ->
                                                                   if e.key = "Enter" then
                                                                       addToDo (e)
                                                                   else
                                                                       ()}>
          <button @click={addToDo}>Add</button>
          <br>
          <label>
            <input type="checkbox"
              @change={setHideCompleted}
              ?checked={props.hideCompleted}>
            Hide completed
          </label>
        """
