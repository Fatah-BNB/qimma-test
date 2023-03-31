import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginForm from './components/login';
import AdminLoginForm from "./components/login-admin";
import RegistrationForm from './components/registration';
import NavBar from './components/navbar';
import Home from './components/home';
import Landing from './components/Landing';
import Password_reset from './components/password_reset';
import Comfirm_email from './components/comfirmed';
import Logout from './components/logout';
import Profile from "./components/profile";
import ErrorPage from "./errPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { checkLoginStatus } from "./slices/user-slice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch()
  const isLogged = useSelector(state => state.userReducer.isLogged)
  useEffect(() => {
    dispatch(checkLoginStatus())
    console.log("on mount: ", isLogged)
  })
  return (
    <Router>
      <div className="App">
      <NavBar/>
        <Routes>
          <Route path="/" element={<ProtectedRoute isLogged={!isLogged} child={<Landing />} redirect="/home"/>} />
          <Route path="/login" element={<ProtectedRoute isLogged={!isLogged} child={<LoginForm />} redirect="/profile"/>} />
          <Route path="/login-admin" element={<ProtectedRoute isLogged={!isLogged} child={<AdminLoginForm />} redirect="/profile"/>} />
          <Route path="/register" element={<ProtectedRoute isLogged={!isLogged} child={<RegistrationForm />} redirect="/profile"/>} />
          <Route path="/home" element={<ProtectedRoute isLogged={isLogged} child={<Home />} redirect="/login"/>} />
          <Route path="/profile" element={<ProtectedRoute isLogged={isLogged} child={<Profile/>} redirect="/login"/>} />
          <Route path="/password-reset" element={<Password_reset />} />
          <Route path="/verify-email" element={<Comfirm_email/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
