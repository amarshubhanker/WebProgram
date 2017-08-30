var express =  require("express");
var bodyParser = require("body-parser");
var todo = require("./seed.js");
var app = express();


var todoList = todo.todoList;

app.use(bodyParser.urlencoded({extended : True}));
app.use(bodyParser.json());

// 1. Show Elements of TodoList

app.get("./api/todos", function (req,res) {
    res.json(todoList);
});

//2.Add new Elements in todoList

app.post("./api/todos", function (req,res) {

    var todoTitle =  req.body.title;

    if(todoTitle==""||todoTitle==null){
        res.status(400).json("Todo Title cannot be Empty....");
        console.log("Todo Title cannot be Empty....");
    }
    else{
        var newTodo = {
            Title : todoTitle.trim(),
            Status : todo.StatusEnums.active
        }

        todoList[todo.nextTodoList] = newTodo;
        todo.nextTodoList++;
        res.status(200).json("New Todo Element has been added....");
        res.send(todoList);
    }

});


//3. Modify any Element in TodoLIst

app.put("./api/todos", function (req,res) {

    var id = req.params.id;
    var modifiedTodo = todoList[id];

    if(modifiedTodo.title == null){
        res.status(400).json("Element is not present at this location");
    }
    else{
        var todoTitle = req.body.title;
        if(todoTitle.trim()== "" || todoTitle == null){
            res.status(400).json("Element can not be Empty...");
        }
        else{
            modifiedTodo.title = todoTitle.trim();
            res.json(todoList);
            console.log(todoList);
        }
    }

});

// 4. Delete an element of todoList

app.delete("/api/todos/:id", function(req, res) {
    var id = req.params.id;
    var modifiedTodo = todoList[id];

    if (modifiedTodo.title === null) {
        res.status(400).json("Todo can't be deleted that does not exist");
        console.log("400, Todo can't be deleted that does not exist");
    } else {
        modifiedTodo.status = "delete";
        res.json(todoList);
        console.log("Todo Deleted");
        console.log(todoList);
    }
});

// 5. Retrieve all active todoElement

app.get("/api/todos/active", function (req, res) {
    var obj = {};

    for (var i = 1; i < todo.nextTodoList; i++) {
        if (todoList[i].status === "active") {
            //console.log(todoList[i]);
            obj[i] = todoList[i];
        }
    }

    res.json(obj);
    console.log(obj);
});

// 6. Retrieve all completed todo's

app.get("/api/todos/completed", function (req, res) {
    var obj = {};

    for (var i = 1; i < todo.nextTodoList; i++) {
        if (todoList[i].status === "complete") {
            //console.log(todoList[i]);
            obj[i] = todoList[i];
        }
    }

    res.json(obj);
    console.log(obj);
});

// 7. Retrieve all deleted todo's

app.get("/api/todos/deleted", function (req, res) {
    var obj = {};

    for (var i = 1; i < todo.nextTodoId; i++) {
        if (todoList[i].status === "delete") {
            //console.log(todoList[i]);
            obj[i] = todoList[i];
        }
    }

    res.json(obj);
    console.log(obj);
});

// 8. mark a todoElement as Complete

app.put("/api/todos/complete/:id", function (req, res) {
    var id = req.params.id;
    var modifiedTodo = todoList[id];

    if (modifiedTodo === null) {
        console.log("400, Todo can't be completed that does not exist");
        res.status(400).json("Todo can't be deleted that does not exist");
    } else {
        modifiedTodo.status = "complete";
        console.log("Status changed to complete");
        res.json(todoList);
    }
});

// 9. mark a todo as active

app.put("/api/todos/active/:id", function (req, res) {
    var id = req.params.id;
    var modifiedTodo = todoList[id];

    if (modifiedTodo === null) {
        console.log("400, Todo can't be completed that does not exist");
        res.status(400).json("Todo can't be deleted that does not exist");
    } else {
        modifiedTodo.status = "active";
        console.log("Status changed to complete");
        res.json(todoList);
    }
});

app.listen(1337, function () {
    console.log("Server hosted at port 1337");
});