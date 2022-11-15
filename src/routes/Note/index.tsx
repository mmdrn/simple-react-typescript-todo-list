import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Note as NoteType } from "../../types/note";
import "./style.scss";
import deleteIcon from "./../../assets/images/delete.png";
import { removeNote } from "../../store/notes";
import UpdateNoteForm from "./UpdateNoteForm";

type RouteParams = {
  id?: string;
};

const Note: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<RouteParams>();
  let notes = useSelector((state: any) => state.notes);
  let note: NoteType = notes[id ? id : ""];
  if (!note) {
    navigate("/notes");
  }

  const handleRemoveNote = (note: NoteType) => {
    dispatch(removeNote(note.id));
    navigate("/notes");
  };

  return (
    <div className="note-page">
      <div className="note">
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
      </div>

      <UpdateNoteForm note={note} />
    </div>
  );
};

export default Note;
