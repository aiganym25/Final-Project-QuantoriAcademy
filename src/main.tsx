import "./index.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
// import { initializeApp } from "firebase/app";
// import { firebase } from "./config/firebase";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProteinPage from "./pages/ProteinPage/ProteinPage";

// initializeApp(config.firebaseConfig);
const lastPage = localStorage.getItem("lastPage");

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<AuthorizationPage />} />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route
            path="*"
            element={<Navigate to={lastPage || "/not-found"} />}
          />
          <Route path="/protein/:id" element={<ProteinPage />} />
        </Routes>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
