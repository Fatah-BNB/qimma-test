import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginForm from './components/login';
import AdminLoginForm from "./components/login-admin";
import RegistrationForm from './components/registration';
import NavBar from './components/navbar';
import Home from './components/home';
import Profile from "./components/profile";
import ErrorPage from "./errPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/login-admin" element={<AdminLoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<ProtectedRoute isLogged={true} child={<Profile/>}/>} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
