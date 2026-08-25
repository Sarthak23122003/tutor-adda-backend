import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

  const { token, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (

    <nav className="bg-black text-white px-8 py-4 flex items-center justify-between">

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold"
      >
        Tutor Adda
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-8">

        {/* Home */}
        <Link
          to="/"
          className="hover:text-gray-300 transition"
        >
          Home
        </Link>

        {/* Tutors */}
        <Link
          to="/tutors"
          className="hover:text-gray-300 transition"
        >
          Tutors
        </Link>

        {
          token ? (
            <>
              {/* Dashboard */}
              <Link
                to="/dashboard"
                className="hover:text-gray-300 transition"
              >
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="hover:text-gray-300 transition"
              >
                Login
              </Link>

              {/* Get Started */}
              <button
                className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Get Started
              </button>
            </>
          )
        }

      </div>

    </nav>
  );
};

export default Navbar;