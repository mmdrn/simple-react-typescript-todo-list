import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import FormControl from "../../../components/FormControl";
import { addTodo } from "../../../store/todos";
import "./style.scss";

const AddTodoForm: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [addTodoForm, updateAddTodoForm] = useState<any>({
    title: {
      key: "title",
      inputType: "text",
      value: "",
      minLength: 3,
      maxLength: 100,
      errors: [],
    },
  });
  const currentLanguage = useSelector(
    (state: any) => state.appSettings.language
  );

  useEffect(() => {
    const _form: any = Object.assign({}, addTodoForm);
    for (const item in _form) {
      _form[item].errors = [];
      _form[item].value = "";
    }

    updateAddTodoForm(_form);
    // eslint-disable-next-line
  }, [currentLanguage]);

  const handleInputChange = (value: any, key: string) => {
    const _form: any = Object.assign({}, addTodoForm);
    _form[key].value = value;

    updateAddTodoForm(_form);
  };

  const formValidation = () => {
    let isValid = true;

    const _form: any = Object.assign({}, addTodoForm);
    for (const item in _form) {
      _form[item].errors = [];
    }

    // title validation
    if (_form.title.value.length < _form.title.minLength) {
      isValid = false;
      const errorMessage = t("addTodoForm.title.errorMinLength", {
        value: _form.title.minLength,
      });
      _form.title.errors.push(errorMessage);
    } else if (_form.title.value.length > _form.title.maxLength) {
      isValid = false;
      const errorMessage = t("addTodoForm.title.errorMaxLength", {
        value: _form.title.maxLength,
      });
      _form.title.errors.push(errorMessage);
    }

    updateAddTodoForm(_form);

    return isValid;
  };

  const submit = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (!formValidation()) return false;
      dispatch(addTodo(addTodoForm.title.value));

      const _form: any = Object.assign({}, addTodoForm);
      _form.title.value = "";

      updateAddTodoForm(_form);
    }
  };

  return (
    <div className="add-todo-form">
      <h2 className="form-title">Add new todos ✏️ 😎</h2>
      <div className="form">
        {Object.keys(addTodoForm).map((key) => {
          return (
            <FormControl
              data={addTodoForm[key]}
              title={t(`addTodoForm.${key}.title`).toString()}
              onHandleChange={handleInputChange}
              placeholder="Just type and press enter"
              onKeyDown={(e: React.KeyboardEvent) => submit(e)}
              key={key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddTodoForm;
