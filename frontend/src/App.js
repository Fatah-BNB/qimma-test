import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginForm from './components/login';
import RegistrationForm from './components/registration';
import NavBar from './components/navbar';
import Home from './components/home';
import Profile from "./components/profile";
import ErrorPage from "./errPage";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
