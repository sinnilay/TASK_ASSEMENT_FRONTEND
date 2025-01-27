import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./PAGES/Home";
import Users from "./PAGES/Users";
import AdminLogin from "./PAGES/Adminlogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
