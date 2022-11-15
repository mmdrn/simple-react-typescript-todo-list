import { FC } from "react";
import AddTodoForm from "./AddTodoForm";
import Todos from "./Todos";
import Notes from "./Notes";
import AddNoteForm from "./AddNoteForm";
import "./style.scss"

const Home: FC = () => {
  document.title = "Ide Sazan | Home";

  return (
    <div className="home-page">
      <Todos />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <AddTodoForm />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <AddNoteForm />
      <br />
      <br />
      <br />
      <br />
      <Notes />
    </div>
  );
};

export default Home;
