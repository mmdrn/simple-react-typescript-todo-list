import { FC, useEffect, useState } from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FormControl from "../../../components/FormControl";
import { UserService } from "../../../services/user.service";

const Signin: FC = () => {
  document.title = "Ide Sazan | Login";
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [form, updateForm] = useState<any>({
    username: {
      key: "username",
      inputType: "text",
      value: "",
      minLength: 3,
      errors: [],
    },
    password: {
      key: "password",
      inputType: "password",
      minLength: 8,
      value: "",
      errors: [],
    },
  });
  const currentLanguage = useSelector(
    (state: any) => state.appSettings.language
  );

  useEffect(() => {
    const _form: any = Object.assign({}, form);
    for (const item in _form) {
      _form[item].errors = [];
      _form[item].value = "";
    }

    updateForm(_form);
    // eslint-disable-next-line
  }, [currentLanguage]);

  const handleInputChange = (value: any, key: string) => {
    const _form: any = Object.assign({}, form);
    _form[key].value = value;

    updateForm(_form);
  };

  const formValidation = () => {
    let isValid = true;

    const _form: any = Object.assign({}, form);
    for (const item in _form) {
      _form[item].errors = [];
    }

    // username validation
    if (_form.username.value.length < _form.username.minLength) {
      isValid = false;
      const errorMessage = t("login.form.username.error", {
        value: _form.username.minLength,
      });
      _form.username.errors.push(errorMessage);
    }

    // password validation
    if (_form.password.value.length < _form.password.minLength) {
      isValid = false;
      const errorMessage = t("login.form.password.error", {
        value: _form.password.minLength,
      });
      _form.password.errors.push(errorMessage);
    }

    updateForm(_form);

    return isValid;
  };

  const submit = async () => {
    if (!formValidation()) return false;

    try {
      const userService = new UserService();
      const response = await userService.Signin({
        name: form.username.value,
        password: form.password.value,
      });

      if (response.status) {
        localStorage.setItem("token", response.token);
        navigate("/home");
        toast.success(response.message, {
          autoClose: 10000,
        });
        return true;
      } else {
        toast.error(response.message, {
          autoClose: 10000,
        });
        return false;
      }
    } catch (error) {
      toast.error(t("login.unexpectedError"), {
        autoClose: 10000,
      });
    }
  };

  return (
    <div className="main-wrapper login-page">
      <h1 className="title">{t("login.title")}</h1>
      <p className="subtitle">{t("login.subtitle")}</p>
      <div className="form">
        {Object.keys(form).map((key) => {
          return (
            <FormControl
              data={form[key]}
              title={t(`login.form.${key}.title`).toString()}
              onHandleChange={handleInputChange}
              key={key}
            />
          );
        })}
        <button type="submit" className="button" onClick={submit}>
          {t("login.loginButton")}
        </button>
        <Link to="/signup" className="link">
          {t("login.signupLink")}
        </Link>
      </div>
    </div>
  );
};

export default Signin;
