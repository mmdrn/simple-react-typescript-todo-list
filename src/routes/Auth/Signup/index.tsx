import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import FormControl from "../../../components/FormControl";
import { fileToBase64 } from "../../../helpers";
import { toast } from "react-toastify";
import "./style.scss";
import { UserService } from "../../../services/user.service";
import { Signup as SignupModel } from "../../../interfaces/types/signup";

const Signup: FC = () => {
  document.title = "Ide Sazan | Signup";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, updateForm] = useState<any>({
    name: {
      key: "name",
      inputType: "text",
      value: "",
      minLength: 3,
      maxLength: 10,
      errors: [],
    },
    family: {
      key: "family",
      inputType: "text",
      value: "",
      minLength: 3,
      maxLength: 10,
      errors: [],
    },
    password: {
      key: "password",
      inputType: "password",
      minLength: 8,
      value: "",
      errors: [],
    },
    repeatPassword: {
      key: "repeatPassword",
      inputType: "password",
      value: "",
      errors: [],
    },
    image: {
      key: "image",
      inputType: "file",
      accept: "image/png, image/jpeg",
      maxSize: 2, //MB
      value: "",
      errors: [],
    },
  });

  const handleInputChange = (value: any, key: string) => {
    const _form = Object.assign({}, form);
    _form[key].value = value;

    updateForm(_form);
  };

  const formValidation = () => {
    let isValid = true;

    const _form = Object.assign({}, form);
    for (const item in _form) {
      _form[item].errors = [];
    }

    // name validation
    if (_form.name.value.length < _form.name.minLength) {
      isValid = false;
      const errorMessage = t("signup.form.name.errors.minLength", {
        value: _form.name.minLength,
      });
      _form.name.errors.push(errorMessage);
    }

    if (_form.name.value.length > _form.name.maxLength) {
      isValid = false;
      const errorMessage = t("signup.form.name.errors.maxLength", {
        value: _form.name.maxLength,
      });
      _form.name.errors.push(errorMessage);
    }

    // family validation
    if (_form.family.value.length < _form.family.minLength) {
      isValid = false;
      const errorMessage = t("signup.form.family.errors.minLength", {
        value: _form.name.minLength,
      });
      _form.family.errors.push(errorMessage);
    }

    if (_form.family.value.length > _form.family.maxLength) {
      isValid = false;
      const errorMessage = t("signup.form.family.errors.maxLength", {
        value: _form.name.maxLength,
      });
      _form.family.errors.push(errorMessage);
    }

    // password validation
    const passwordRegex = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    );
    if (_form.password.value.search(passwordRegex) < 0) {
      isValid = false;
      const errorMessage = t("signup.form.password.error");
      _form.password.errors.push(errorMessage);
    }

    // repeat password validation
    if (_form.repeatPassword.value !== _form.password.value) {
      isValid = false;
      const errorMessage = t("signup.form.repeatPassword.error");
      _form.repeatPassword.errors.push(errorMessage);
    }

    // image validation
    if (!_form.image.value) {
      isValid = false;
      const errorMessage = t("signup.form.image.errors.required");
      _form.image.errors.push(errorMessage);
    } else {
      const bytes = require("bytes");
      if (
        _form.image.value &&
        _form.image.value.size &&
        parseFloat(bytes(_form.image.value.size, { unit: "mb" })) >
          _form.image.maxSize
      ) {
        isValid = false;
        const errorMessage = t("signup.form.image.errors.maximumSize");
        _form.image.errors.push(errorMessage);
      }
    }

    updateForm(_form);

    return isValid;
  };

  const submit = async () => {
    if (!formValidation()) return false;

    try {
      const userService = new UserService();
      const image = await fileToBase64(form.image.value);

      if (!image) {
        toast.error(t("signup.unexpectedError"), {
          autoClose: 10000,
        });
        return false;
      }

      const data: SignupModel = {
        name: form.name.value,
        family: form.family.value,
        password: form.password.value,
        image: image,
      };

      const response = await userService.Signup(data);
      

      if (response.status) {
        toast.success(response.message, {
          autoClose: 10000,
        });
        navigate("/login");
        return true;
      } else {
        toast.error(response.message, {
          autoClose: 10000,
        });
        navigate("/login");
        return false;
      }
    } catch (error) {
      toast.error(t("signup.unexpectedError"), {
        autoClose: 10000,
      });
    }
  };

  return (
    <div className="main-wrapper signup-page">
      <h1 className="title">{t("signup.title")}</h1>
      <p className="subtitle">{t("signup.subtitle")}</p>

      <div className="form">
        {Object.keys(form).map((key) => {
          return (
            <FormControl
              data={form[key]}
              title={t(`signup.form.${key}.title`).toString()}
              onHandleChange={handleInputChange}
              key={key}
            />
          );
        })}
        <button type="submit" className="button" onClick={submit}>
          {t("signup.signupButton")}
        </button>
        <Link to="/login" className="link">
          {t("signup.loginLink")}
        </Link>
      </div>
    </div>
  );
};

export default Signup;
