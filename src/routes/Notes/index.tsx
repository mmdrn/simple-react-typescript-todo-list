import { FC } from "react";
import AddNoteForm from "./AddNoteForm";
import NotesList from "./NotesList";
import "./style.scss";

const Todos: FC = () => {
  return (
    <div className="notes-page">
      <AddNoteForm />
      <NotesList />
      <br />
    </div>
  );
};

export default Todos;
