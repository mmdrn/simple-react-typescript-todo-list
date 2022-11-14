import { FC } from "react";
import { useSelector } from "react-redux";
import { Todo } from "../../../types/todo";

const Todos: FC = () => {
  const todos: Todo[] = useSelector((state: any) => state.todos);

  const handleCheckTodo = (todo: Todo, status: Boolean) => {
    todo.is_checked = status;
  };

  return (
    <div className="todos-list">
      {Object.values(todos).map((todo: Todo) => (
        <div
          key={todo.id}
          className="todo"
          onClick={(e) => handleCheckTodo(todo, !todo.is_checked)}
        >
          <h2 className="title">{todo.title}</h2>
          <p className="created-date">
            {new Date(todo.created_date).toDateString()}
          </p>
          <p className="updated-date">
            {todo.updated_date
              ? todo.updated_date.toDateString()
              : "تغییری نداشته"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Todos;
