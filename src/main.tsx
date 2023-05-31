import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import { Provider } from "react-redux";
import { store } from "./state-management/store";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import { AuthProvider } from "./state-management/context/AuthContext";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProteinPage from "./pages/ProteinPage/ProteinPage";
import { ROUTES } from "./routes/routesConfig";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <Routes>
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.AUTH} element={<AuthorizationPage />} />
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.NOTFOUND} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={ROUTES.NOTFOUND} />} />
          <Route path={ROUTES.PROTEIN} element={<ProteinPage />} />
        </Routes>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
