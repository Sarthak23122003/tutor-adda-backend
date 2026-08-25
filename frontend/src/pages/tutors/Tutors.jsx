import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTutors } from "../../services/tutorService";

const Tutors = () => {

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch Tutors
  useEffect(() => {

    const fetchTutors = async () => {

      try {

        const data = await getAllTutors();

        console.log(data);

        setTutors(data.tutors);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchTutors();

  }, []);

  // Loading State
  if (loading) {

    return (
      <div className="p-10 text-2xl font-bold">
        Loading Tutors...
      </div>
    );
  }

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-5xl font-bold mb-10">
        Find Tutors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {
          tutors.map((tutor) => (

            <div
              key={tutor._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              {/* Profile Image */}
              <div className="flex justify-center">

                <img
                  src={
                    tutor.profilePhoto ||
                    tutor.profileImage ||
                    "https://i.pravatar.cc/150?img=3"
                  }
                  alt={tutor.name || tutor.user?.name}
                  className="w-28 h-28 rounded-full object-cover"
                />

              </div>

              {/* Tutor Info */}
              <div className="text-center mt-5">

                <h2 className="text-3xl font-bold">
                  {tutor.name || tutor.user?.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  {tutor.subject || tutor.subjects || "Tutor"}
                </p>

                <p className="text-2xl font-semibold mt-4">
                  ₹{tutor.hourlyRate}/hour
                </p>

              </div>

              {/* Button */}
              <button
                onClick={() => navigate(`/tutors/${tutor._id}`)}
                className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
              >
                View Profile
              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default Tutors;