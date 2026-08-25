import { useParams, useNavigate } from "react-router-dom";

const TutorDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-10 items-center">

          {/* Image */}
          <img
            src="https://i.pravatar.cc/300"
            alt="Tutor"
            className="w-52 h-52 rounded-full object-cover"
          />

          {/* Info */}
          <div>

            <h1 className="text-6xl font-bold">
              Rahul Sharma
            </h1>

            <p className="text-3xl text-gray-600 mt-3">
              Mathematics Tutor
            </p>

            <p className="text-5xl font-bold mt-6">
              ₹500/hour
            </p>

          </div>

        </div>

        {/* About */}
        <div className="mt-12">

          <h2 className="text-4xl font-bold mb-5">
            About Tutor
          </h2>

          <p className="text-xl text-gray-700 leading-9">
            Experienced Mathematics tutor with 5+ years of teaching
            experience helping students improve concepts and grades.
          </p>

        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/booking")}
          className="mt-10 bg-black text-white px-10 py-4 rounded-2xl text-xl hover:bg-gray-800 transition"
        >
          Book Session
        </button>

      </div>

    </div>
  );
};

export default TutorDetails;