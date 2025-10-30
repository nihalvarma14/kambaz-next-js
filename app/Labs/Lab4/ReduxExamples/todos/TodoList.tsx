"use client"

import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

// Define the Todo type
interface Todo {
  id: string;
  title: string;
}

// Define the Redux state type
interface RootState {
  todosReducer: {
    todos: Todo[];
    todo: Todo;
  };
}

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <hr />
    </div>
  );
}