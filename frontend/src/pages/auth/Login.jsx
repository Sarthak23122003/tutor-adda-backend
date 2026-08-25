import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { loginUser } from "../../Services/authService";
import { useNavigate } from "react-router-dom";
const Login = () => {

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const { login } = useContext(AuthContext);
const navigate = useNavigate();
  // Loading State
  const [loading, setLoading] = useState(false);

  // Message State
  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = await loginUser(formData);

      console.log(data);

      // Save Token
      login(data.token);
      setMessage("Login Successful ✅");
      navigate("/dashboard");

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[400px]">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Student Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>

          {/* Password */}
          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

        {/* Message */}
        {
          message && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
              {message}
            </div>
          )
        }

      </div>

    </div>
  );
};

export default Login;