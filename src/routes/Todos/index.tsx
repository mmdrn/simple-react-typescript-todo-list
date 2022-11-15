import { FC } from "react";
import AddTodoForm from "./AddTodoForm";
import TodosList from "./TodosList";
import "./style.scss";

const Todos: FC = () => {
  return (
    <div className="todos-page">
      <AddTodoForm />
      <TodosList />
      <br />
    </div>
  );
};

export default Todos;
