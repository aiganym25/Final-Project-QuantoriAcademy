import "./index.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitialPage from "./pages/MainPage/MainPage";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import HomePage from "./pages/HomePage/HomePage";
import AuthRoute from "./components/AuthRoute";

initializeApp(config.firebaseConfig);

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/not-found" element={<InitialPage />} />
        <Route path="/auth" element={<AuthorizationPage />} />
        <Route
          path="/home"
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
      </Routes>
    </Provider>
  </BrowserRouter>
);
