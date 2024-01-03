/* eslint-disable no-case-declarations */

const initialTodo = () => {
  const loadedTasks = window.localStorage.getItem("todo");
  if (loadedTasks) {
    return JSON.parse(loadedTasks);
  }
  window.localStorage.setItem("todo", JSON.stringify([]));
  return [];
};

const initialState = {
  filter: "all",
  todo: initialTodo(),
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const { id, title } = action.payload;
      const updatedTodoAdd = [...state.todo, { id, title }];
      window.localStorage.setItem("todo", JSON.stringify(updatedTodoAdd));
      return { ...state, todo: updatedTodoAdd };

    case "DELETE_TODO":
      const { index } = action.payload;
      const updatedTodoDelete = [...state.todo];
      updatedTodoDelete.splice(index, 1);
      window.localStorage.setItem("todo", JSON.stringify(updatedTodoDelete));
      return { ...state, todo: updatedTodoDelete };

    case "UPDATE_TODO":
      const updatedTodo = state.todo.map((task) => {
        console.log(task.id);
        console.log(action.payload.id);
        if (action.payload.id === task.id) {
          return { ...task, title: action.payload.title };
        }
        return task;
      });
      window.localStorage.setItem("todo", JSON.stringify(updatedTodo));
      return { ...state, todo: updatedTodo };

    default:
      return state;
  }
};

export default todoReducer;
