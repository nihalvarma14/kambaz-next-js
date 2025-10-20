import TodoItem from "./TodoItem";
import todos from "./todos.json";

export default function TodoList() {
  return (
    <div id="wd-todo-list">
      <h3>Todo List</h3>
      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem key={todo.title} todo={todo} />
        ))}
      </ul>
    </div>
  );
}