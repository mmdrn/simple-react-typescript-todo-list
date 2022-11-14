import { FC } from "react";
import AddTodoForm from "./AddTodoForm";
import Todos from "./Todos";
import Notes from "./Notes";
import AddNoteForm from "./AddNoteForm";

const Home: FC = () => {
  document.title = "Ide Sazan | Home";

  return (
    <div className="main-wrapper home-page">
      <AddTodoForm />
      <br />
      <br />
      <br />
      <br />
      <Todos />
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
