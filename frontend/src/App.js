import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginForm from './components/login';
import AdminLoginForm from "./components/login-admin";
import RegistrationForm from './components/registration';
import NavBar from './components/navbar';
import Home from './components/home';
import Profile from "./components/profile";
import ErrorPage from "./errPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  const isLogged = useSelector(state => state.userReducer.value.isLogged)
  return (
    <Router>
      <div className="App">
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<ProtectedRoute isLogged={!isLogged} child={<LoginForm />} redirect="/profile"/>} />
          <Route path="/login-admin" element={<AdminLoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<ProtectedRoute isLogged={isLogged} child={<Profile/>} redirect="/login"/>} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
