import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import logo from "./../../assets/images/logo.svg";
import { setLanguage } from "../../store/appSettings";
import { useTranslation } from "react-i18next";

export default function Header() {
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.appSettings.languages);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;

  const handleChangeLanguage = (language) => {
    dispatch(setLanguage(language));
    i18n.changeLanguage(language.key);
  };

  return (
    <header className="main-header">
      <figure className="logo">
        <img src={logo} alt="diss-co logo" />
      </figure>

      <div className="languages">
        {languages.map((language) => (
          <span
            onClick={() => handleChangeLanguage(language)}
            disabled={i18n.resolvedLanguage === language.key}
            key={language.key}
            className={`item ${
              language.key === currentLanguage ? "active" : ""
            }`}
          >
            {language.title}
          </span>
        ))}
      </div>
    </header>
  );
}
