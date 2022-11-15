import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../store/appSettings";
import { useTranslation } from "react-i18next";
import logo from "./../../assets/images/logo.svg";
import { FC } from "react";

interface HeaderProps {
  layout: "dashboard" | "auth";
}

const Header: FC<HeaderProps> = (props) => {
  const dispatch = useDispatch();
  const languages = useSelector((state: any) => state.appSettings.languages);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;

  const handleChangeLanguage = (language: any) => {
    dispatch(setLanguage(language));
    i18n.changeLanguage(language.key);
  };

  return (
    <header className={`main-header ${props.layout}`}>
      <figure className="logo">
        <img src={logo} alt="diss-co logo" />
      </figure>

      <div className="languages">
        {languages.map((language: any) => (
          <span
            onClick={() => handleChangeLanguage(language)}
            /* disabled={i18n.resolvedLanguage === language.key} */
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
};
export default Header;