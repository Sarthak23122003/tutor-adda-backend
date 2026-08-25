import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getStudentBookings } from "../../services/bookingService";

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBookings = async () => {
    try {
      const data = await getStudentBookings(token);

      console.log("========== API RESPONSE ==========");
      console.log(data);

      setBookings(data.bookings);
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    fetchBookings();
  }
}, [token]);

  if (loading) {
    return (
      <div className="p-10 text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-5xl font-bold mb-10">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center text-xl">
          No bookings found.
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold">
                {booking.subject}
              </h2>

              <p className="mt-2">
                Tutor : {booking.tutor?.name}
              </p>

              <p>
                Date : {booking.bookingDate}
              </p>

              <p>
                Time : {booking.startTime} - {booking.endTime}
              </p>

              <p>
                Status :
                <span className="font-bold ml-2">
                  {booking.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Dashboard;