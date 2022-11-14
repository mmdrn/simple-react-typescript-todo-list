import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import FormControl from "../../../components/FormControl";
import { addNote } from "../../../store/notes";

const AddNoteForm: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [addNoteForm, updateAddNoteForm] = useState<any>({
    title: {
      key: "title",
      inputType: "text",
      value: "",
      minLength: 3,
      maxLength: 100,
      errors: [],
    },
    description: {
      key: "description",
      inputType: "text",
      value: "",
      minLength: 3,
      maxLength: 280,
      errors: [],
    },
  });
  const currentLanguage = useSelector(
    (state: any) => state.appSettings.language
  );

  useEffect(() => {
    const _form: any = Object.assign({}, addNoteForm);
    for (const item in _form) {
      _form[item].errors = [];
      _form[item].value = "";
    }

    updateAddNoteForm(_form);
    // eslint-disable-next-line
  }, [currentLanguage]);

  const handleInputChange = (value: any, key: string) => {
    const _form: any = Object.assign({}, addNoteForm);
    _form[key].value = value;

    updateAddNoteForm(_form);
  };

  const formValidation = () => {
    let isValid = true;

    const _form: any = Object.assign({}, addNoteForm);
    for (const item in _form) {
      _form[item].errors = [];
    }

    // title validation
    if (_form.title.value.length < _form.title.minLength) {
      isValid = false;
      const errorMessage = t("addNoteForm.title.errorMinLength", {
        value: _form.title.minLength,
      });
      _form.title.errors.push(errorMessage);
    } else if (_form.title.value.length > _form.title.maxLength) {
      isValid = false;
      const errorMessage = t("addNoteForm.title.errorMaxLength", {
        value: _form.title.maxLength,
      });
      _form.title.errors.push(errorMessage);
    }

    // description validation
    if (_form.description.value.length < _form.description.minLength) {
      isValid = false;
      const errorMessage = t("addNoteForm.description.errorMinLength", {
        value: _form.description.minLength,
      });
      _form.description.errors.push(errorMessage);
    } else if (_form.description.value.length > _form.description.maxLength) {
      isValid = false;
      const errorMessage = t("addNoteForm.description.errorMaxLength", {
        value: _form.description.maxLength,
      });
      _form.description.errors.push(errorMessage);
    }

    updateAddNoteForm(_form);

    return isValid;
  };

  const submit = async () => {
    if (!formValidation()) return false;

    dispatch(
      addNote({
        title: addNoteForm.title.value,
        description: addNoteForm.description.value,
      })
    );
  };

  return (
    <div>
      <div className="form">
        {Object.keys(addNoteForm).map((key) => {
          return (
            <FormControl
              data={addNoteForm[key]}
              title={t(`addNoteForm.${key}.title`).toString()}
              onHandleChange={handleInputChange}
              key={key}
            />
          );
        })}
        <button type="submit" className="button" onClick={submit}>
          {t("login.loginButton")}
        </button>
      </div>
    </div>
  );
};

export default AddNoteForm;
