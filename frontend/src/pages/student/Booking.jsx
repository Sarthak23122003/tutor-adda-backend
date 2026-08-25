import { useState, useContext } from "react";
import { createBooking } from "../../services/bookingService";
import { AuthContext } from "../../context/AuthContext";

const Booking = () => {

  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    tutorId: "",
    subject: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Booking
  const handleBooking = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = await createBooking(
        formData,
        token
      );

      console.log(data);

      setMessage("Booking Successful ✅");

      // Reset Form
      setFormData({
        tutorId: "",
        subject: "",
        date: "",
        time: "",
      });

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.message ||
        "Booking Failed ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-xl">

        <h1 className="text-5xl font-bold text-center mb-10">
          Book Session
        </h1>

        <form
          onSubmit={handleBooking}
          className="space-y-6"
        >

          {/* Tutor ID */}
          <div>

            <label className="block font-semibold mb-2">
              Tutor ID
            </label>

            <input
              type="text"
              name="tutorId"
              placeholder="Enter Tutor ID"
              value={formData.tutorId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-4 outline-none"
              required
            />

          </div>

          {/* Subject */}
          <div>

            <label className="block font-semibold mb-2">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-4 outline-none"
              required
            />

          </div>

          {/* Date */}
<div>

  <label className="block font-semibold mb-2">
    Date
  </label>

  <input
    type="date"
    name="bookingDate"
    value={formData.bookingDate}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-xl px-4 py-4 outline-none"
    required
  />

</div>

          {/* Time */}
          <div>

            <label className="block font-semibold mb-2">
              Start Time
            </label>

            <input
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-4 outline-none"
              required
            />

            <p className="text-sm text-gray-500 mt-2">
              Example: 10:30 or 22:30
            </p>

          </div>

          {/* End Time */}
<div>

  <label className="block font-semibold mb-2">
    End Time
  </label>

  <input
    type="text"
    name="endTime"
    placeholder="Example: 11:30"
    value={formData.endTime}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-xl px-4 py-4 outline-none"
    required
  />

</div>
{/* Duration */}
<div>

  <label className="block font-semibold mb-2">
    Duration
  </label>

  <input
    type="number"
    name="duration"
    placeholder="Enter Duration in Hours"
    value={formData.duration}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-xl px-4 py-4 outline-none"
    required
  />

</div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl text-xl hover:bg-gray-800 transition"
          >

            {
              loading
                ? "Booking..."
                : "Confirm Booking"
            }

          </button>

        </form>

        {/* Message */}
        {
          message && (
            <div className="mt-6 bg-gray-100 p-4 rounded-xl text-center text-lg">
              {message}
            </div>
          )
        }

      </div>

    </div>
  );
};

export default Booking;