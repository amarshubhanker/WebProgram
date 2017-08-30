var StatusEnums = {
        active : "active",
        complete: "complete",
        deleted : "deleted"
};

var todoList = {

    1 : {Title: "Learn C#", Status: StatusEnums.complete},
    2 : {Title: "Learn JavaScript", Status: StatusEnums.complete},
    3 : {Title: "Learn Node", Status: StatusEnums.active}

};

var nextTodoList = 4;

modules.exports = {
  StatusEnums : StatusEnums,
  todoList : todoList,
  nextTodoList : nextTodoList
};