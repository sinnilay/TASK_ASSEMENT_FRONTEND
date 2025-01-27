import { useState } from "react";
import { loginAdmin } from "../SERVICES/Api.js";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(formData);
      alert(res.data.msg);
      navigate('/users')
    } catch (error) {
      console.error(error);
      alert("Error logging in.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 shadow-md rounded">
      <h2 className="text-lg font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
