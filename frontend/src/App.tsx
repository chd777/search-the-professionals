import { Routes, Route } from "react-router-dom";
import Login from "./features/login/login";
import Register from "./features/register/register";
import HomePage from "./features/home/homepage";
import ProfilePage from "./features/profile/ProfilePage";
import LoginGuard from "./shared/guards/loginGuards";
import AuthGuard from "./shared/guards/authguards";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginGuard>
            <Login />
          </LoginGuard>
        }
      />
      <Route
        path="/login"
        element={
          <LoginGuard>
            <Login />
          </LoginGuard>
        }
      />
      <Route
        path="/register"
        element={
          <LoginGuard>
            <Register />
          </LoginGuard>
        }
      />
      <Route
        path="/home"
        element={
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
    </Routes>
  );
}

export default App;
