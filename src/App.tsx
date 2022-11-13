import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./assets/scss/base.scss";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
