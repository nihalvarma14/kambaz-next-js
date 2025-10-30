"use client"

import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

// Define the Todo type
interface Todo {
  id: string;
  title: string;
}

// Define the Redux state type
interface RootState {
  todosReducer: {
    todo: Todo;
    todos: Todo[];
  };
}

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  
  return (
    <li className="list-group-item">
      <button
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
        className="btn btn-success me-2"
      >
        Add
      </button>
      <button
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
        className="btn btn-warning me-2"
      >
        Update
      </button>
      <input
        className="form-control d-inline w-50"
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
    </li>
  );
}