const Button = ({ text }) => {
  return (
    <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition duration-300">
      {text}
    </button>
  );
};

export default Button;