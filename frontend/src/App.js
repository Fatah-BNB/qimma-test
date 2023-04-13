import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginForm from './components/login';
import AdminLoginForm from "./components/login-admin";
import RegistrationForm from './components/registration';
import Home from './components/home';
import Landing from './components/Landing';
import Password_reset from './components/password_reset';
import Comfirm_email from './components/comfirmed';
import Logout from './components/logout';
import Profile from "./components/profile";
import Email_comfirmed from "./components/comfirmed-email";
import AdminDashboard from "./components/admin/admin-dashboard";
import ErrorPage from "./errPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { checkLoginStatus } from "./slices/user-slice";
import { checkAdminLoginStatus } from "./slices/admin-slice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch()
  const isLogged = useSelector(state => state.userReducer.isLogged)
  const adminIsLogged = useSelector(state => state.adminReducer.isLogged)
  useEffect(() => {

    dispatch(checkLoginStatus())
    dispatch(checkAdminLoginStatus())
    console.log("on mount: ", isLogged)
    console.log("on mount admin: ", adminIsLogged)
  })
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProtectedRoute isLogged={!isLogged} child={<Landing />} redirect="/home"/>} />
          <Route path="/home" element={<ProtectedRoute isLogged={isLogged} child={<Home />} redirect="/login"/>} />

          <Route path="/register" element={<ProtectedRoute isLogged={!isLogged} child={<RegistrationForm />} redirect="/profile"/>} />
          <Route path="/login" element={<ProtectedRoute isLogged={!isLogged} child={<LoginForm />} redirect="/profile"/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/profile" element={<ProtectedRoute isLogged={isLogged} child={<Profile/>} redirect="/login"/>} />
          <Route path="/verify-email" element={<Comfirm_email/>} />
          <Route path="/password-reset/*" element={<Password_reset />} />
          <Route path="/verify-user-email/*" element={<Email_comfirmed/>} />
          <Route path="/login-admin" element={<ProtectedRoute isLogged={!adminIsLogged} child={<AdminLoginForm />} redirect="/admin-dashboard"/>} />\
          <Route path="/admin-dashboard" element={<ProtectedRoute isLogged={adminIsLogged} child={<AdminDashboard />} redirect="/login-admin"/>} />\

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
