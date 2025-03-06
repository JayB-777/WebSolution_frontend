import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RegisterForm from "../components/RegisterForm";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
