import { useEffect, useState } from "react";

const TutorDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API call will come here
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Tutor Dashboard
        </h1>

        {loading ? (
          <div className="text-center py-20">
            Loading...
          </div>
        ) : (
          <>
            {bookings.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-10 text-center">

                <h2 className="text-xl font-semibold">
                  No Booking Requests
                </h2>

                <p className="text-gray-500 mt-2">
                  Students haven't booked you yet.
                </p>

              </div>
            ) : (
              <div>

              </div>
            )}
          </>
        )}

      </div>

    </div>
  );
};

export default TutorDashboard;