import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        Tutor Adda
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">

        <Link
          to="/"
          className="hover:text-gray-300 transition duration-300"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="hover:text-gray-300 transition duration-300"
        >
          Login
        </Link>

        <button className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-300">
          Get Started
        </button>

      </div>
    </nav>
  );
};

export default Navbar;