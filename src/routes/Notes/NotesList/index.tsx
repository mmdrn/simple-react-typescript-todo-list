import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNote } from "../../../store/notes";
import { Note } from "../../../types/note";
import "./style.scss";
import deleteIcon from "./../../../assets/images/delete.png";
import { Link } from "react-router-dom";

const NotesList: FC = () => {
  const dispatch = useDispatch();
  const notes: Note[] = useSelector((state: any) => state.notes);

  const handleRemoveNote = (note: Note) => {
    dispatch(removeNote(note.id));
  };

  return (
    <div className="notes-list">
      {Object.values(notes).map((note: Note) => (
        <Link to={`/notes/${note.id}`} className="note" key={note.id}>
          <h2 className="title">{note.title}</h2>
          <p className="description">{note.description}</p>

          <p className="date">
            {note.updated_date
              ? new Date(note.updated_date).toDateString()
              : new Date(note.created_date).toDateString()}
          </p>
          <button
            type="button"
            className="delete"
            onClick={(e) => {
              handleRemoveNote(note);
            }}
          >
            <img src={deleteIcon} alt="delete" />
          </button>
        </Link>
      ))}
    </div>
  );
};

export default NotesList;
