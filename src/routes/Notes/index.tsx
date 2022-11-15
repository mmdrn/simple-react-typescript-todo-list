import { FC } from "react";
import AddNoteForm from "./AddNoteForm";
import NotesList from "./Notes";
import "./style.scss";

const Todos: FC = () => {
  return (
    <div className="todos-page">
      <AddNoteForm />
      <NotesList />
      <br />
    </div>
  );
};

export default Todos;
