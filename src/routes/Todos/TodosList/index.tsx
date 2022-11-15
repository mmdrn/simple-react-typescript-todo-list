import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkTodo, removeTodo } from "../../../store/todos";
import { Todo } from "../../../types/todo";
import "./style.scss";
import deleteIcon from "./../../../assets/images/delete.png";
import checkedIcon from "./../../../assets/images/check.png";

const TodosList: FC = () => {
  const dispatch = useDispatch();
  const todos: Todo[] = useSelector((state: any) => state.todos);

  const handleCheckTodo = (todo: Todo, status: boolean) => {
    dispatch(
      checkTodo({
        id: todo.id,
        is_checked: status,
      })
    );
  };

  const handleRemoveTodo = (todo: Todo) => {
    dispatch(removeTodo(todo.id));
  };

  return (
    <div className="todos-list">
      {Object.values(todos)
        .reverse()
        .map((todo: Todo) => (
          <div
            key={todo.id}
            className={`todo ${todo.is_checked ? "checked" : ""}`}
          >
            <span
              className="checkbox"
              onClick={(e) => handleCheckTodo(todo, !todo.is_checked)}
            >
              {todo.is_checked ? <img src={checkedIcon} alt="checked" /> : ""}
            </span>
            <h2 className="title">{todo.title}</h2>
            <p className="date">
              {todo.updated_date
                ? new Date(todo.updated_date).toDateString()
                : new Date(todo.created_date).toDateString()}
            </p>
            <button
              type="button"
              className="delete"
              onClick={(e) => handleRemoveTodo(todo)}
            >
              <img src={deleteIcon} alt="delete" />
            </button>
          </div>
        ))}
    </div>
  );
};

export default TodosList;
