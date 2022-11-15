import { FC, /* useEffect, */ useState } from "react";
import { useTranslation } from "react-i18next";
import { /* useSelector, */ useDispatch } from "react-redux";
import FormControl from "../../../components/FormControl";
import { updateNote } from "../../../store/notes";
import { Note } from "../../../types/note";
import "./style.scss";

interface ComponentProps {
  note: Note;
}

const UpdateNoteForm: FC<ComponentProps> = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [updateNoteForm, updateUpdateNoteForm] = useState<any>({
    title: {
      key: "title",
      inputType: "text",
      value: props.note.title,
      minLength: 3,
      maxLength: 100,
      errors: [],
    },
    description: {
      key: "description",
      inputType: "text",
      value: props.note.description,
      minLength: 3,
      maxLength: 280,
      errors: [],
    },
  });
  //   const currentLanguage = useSelector(
  //     (state: any) => state.appSettings.language
  //   );

  //   useEffect(() => {
  //     const _form: any = Object.assign({}, updateNoteForm);
  //     for (const item in _form) {
  //       _form[item].errors = [];
  //       _form[item].value = "";
  //     }

  //     updateUpdateNoteForm(_form);
  //     // eslint-disable-next-line
  //   }, [currentLanguage]);

  const handleInputChange = (value: any, key: string) => {
    const _form: any = Object.assign({}, updateNoteForm);
    _form[key].value = value;

    updateUpdateNoteForm(_form);
  };

  const formValidation = () => {
    let isValid = true;

    const _form: any = Object.assign({}, updateNoteForm);
    for (const item in _form) {
      _form[item].errors = [];
    }

    // title validation
    if (_form.title.value.length < _form.title.minLength) {
      isValid = false;
      const errorMessage = t("updateNoteForm.title.errorMinLength", {
        value: _form.title.minLength,
      });
      _form.title.errors.push(errorMessage);
    } else if (_form.title.value.length > _form.title.maxLength) {
      isValid = false;
      const errorMessage = t("updateNoteForm.title.errorMaxLength", {
        value: _form.title.maxLength,
      });
      _form.title.errors.push(errorMessage);
    }

    // description validation
    if (_form.description.value.length < _form.description.minLength) {
      isValid = false;
      const errorMessage = t("updateNoteForm.description.errorMinLength", {
        value: _form.description.minLength,
      });
      _form.description.errors.push(errorMessage);
    } else if (_form.description.value.length > _form.description.maxLength) {
      isValid = false;
      const errorMessage = t("updateNoteForm.description.errorMaxLength", {
        value: _form.description.maxLength,
      });
      _form.description.errors.push(errorMessage);
    }

    updateUpdateNoteForm(_form);

    return isValid;
  };

  const submit = async () => {
    if (!formValidation()) return false;
    dispatch(
      updateNote({
        id: props.note.id,
        title: updateNoteForm.title.value,
        description: updateNoteForm.description.value,
      })
    );
  };

  return (
    <div className="update-note-form">
      <div className="form">
        {Object.keys(updateNoteForm).map((key) => {
          return (
            <FormControl
              data={updateNoteForm[key]}
              title={t(`updateNoteForm.${key}.title`).toString()}
              onHandleChange={handleInputChange}
              key={key}
            />
          );
        })}
        <button type="submit" className="button" onClick={submit}>
          {t("updateNoteForm.submitButton")}
        </button>
      </div>
    </div>
  );
};

export default UpdateNoteForm;
