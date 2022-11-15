import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "./store/appSettings";
import "./assets/scss/base.scss";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./routes/Auth/Login";
import AuthLayout from "./layouts/Auth";
import Signup from "./routes/Auth/Signup";
import DashboardLayout from "./layouts/Dashboard";
import Todos from "./routes/Todos";
import Notes from "./routes/Notes";
import Note from "./routes/Note";

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const currentLanguage = useSelector(
    (state: any) => state.appSettings.language
  );
  const languages = useSelector((state: any) => state.appSettings.languages);

  useEffect(() => {
    dispatch(
      setLanguage(languages.find((l: any) => l.key === i18n.resolvedLanguage))
    );
  }, [dispatch, i18n, languages]);

  return (
    <div className="App" dir={currentLanguage.dir}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/todos" element={<Todos />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<Note />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
