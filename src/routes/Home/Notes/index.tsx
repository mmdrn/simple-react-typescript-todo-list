import { FC } from "react";
import { useSelector } from "react-redux";
import { Note } from "../../../types/note";

const Notes: FC = () => {
  const notes: Note[] = useSelector((state: any) => state.notes);

  return (
    <div className="notes-list">
      {Object.values(notes).map((note: Note) => (
        <div className="note" key={note.id}>
          <h2 className="title">{note.title}</h2>
          <h2 className="description">{note.description}</h2>
          <p className="created-date">{new Date(note.created_date).toDateString()}</p>
          <p className="updated-date">
            {note.updated_date
              ? note.updated_date.toDateString()
              : "تغییری نداشته"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
