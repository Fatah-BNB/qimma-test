import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginForm from './components/user/login/login';
import AdminLoginForm from "./components/admin/login/login-admin";
import RegistrationForm from './components/user/registration/registration';
import Home from './components/user/home/home';
import Landing from './components/user/landing-page/Landing';
import Password_reset from './components/user/password-reset/password_reset';
import Comfirm_email from './components/user/email-confirmation/comfirmed';
import Logout from './components/user/logout/logout';
import Profile from "./components/user/profile/profile";
import Email_comfirmed from "./components/user/email-confirmation/comfirmed-email";
import InstrcutorDashboard from "./components/instructor/dashboard";
import CreateCourse from "./components/instructor/create-course/create-course";
import CoursesList from "./components/instructor/my-courses/courses-list";
import CourseLibrary from "./components/student/course-library/course-library";
import AdminDashboard from "./components/admin/dashboard/admin-dashboard";
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
          <Route path="/" element={<ProtectedRoute isLogged={!isLogged} child={<Landing />} redirect="/home" />} />
          <Route path="/home" element={<ProtectedRoute isLogged={isLogged} child={<Home />} redirect="/login" />} />

          <Route path="/register" element={<ProtectedRoute isLogged={!isLogged} child={<RegistrationForm />} redirect="/profile" />} />
          <Route path="/login" element={<ProtectedRoute isLogged={!isLogged} child={<LoginForm />} redirect="/profile" />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<ProtectedRoute isLogged={isLogged} child={<Profile />} redirect="/login" />} />
          <Route path="/verify-email" element={<Comfirm_email />} />
          <Route path="/password-reset/*" element={<Password_reset />} />
          <Route path="/verify-user-email/*" element={<Email_comfirmed />} />


          <Route path="/login-admin" element={<ProtectedRoute isLogged={!adminIsLogged} child={<AdminLoginForm />} redirect="/admin-dashboard" />} />\
          <Route path="/admin-dashboard" element={<ProtectedRoute isLogged={adminIsLogged} child={<AdminDashboard />} redirect="/login-admin" />} />\


          <Route path="/instructor-dashboard" element={<ProtectedRoute isLogged={isLogged} child={<InstrcutorDashboard />} redirect="/login" />} />\
          <Route path="/instructor-my-courses" element={<ProtectedRoute isLogged={isLogged} child={<CoursesList />} redirect="/login" />} />\
          <Route path="/instructor-create-course" element={<ProtectedRoute isLogged={isLogged} child={<CreateCourse />} redirect="/login" />} />\
          
          <Route path="/course-library" element={<ProtectedRoute isLogged={isLogged} child={<CourseLibrary />} redirect="/login" />} />\

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
