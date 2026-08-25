import { useState } from "react";
import { createBooking } from "../../services/bookingService";

const BookSession = () => {

  const [formData, setFormData] = useState({
    tutorId: "",
    bookingDate: "",
    time: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {

    e.preventDefault();

    try {

      const data = await createBooking(formData);

      console.log(data);

      setMessage("Booking Successful 🚀");

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.message ||
        "Booking Failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[450px]">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Book Session
        </h1>

        <form
          onSubmit={handleBooking}
          className="space-y-6"
        >

          {/* Tutor ID */}
          <div>

            <label className="block mb-2 font-medium">
              Tutor ID
            </label>

            <input
              type="text"
              name="tutorId"
              placeholder="Enter Tutor ID"
              value={formData.tutorId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />

          </div>

          {/* Date */}
          <div>

            <label className="block mb-2 font-medium">
              Select Date
            </label>

            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />

          </div>

          {/* Time */}
          <div>

            <label className="block mb-2 font-medium">
              Select Time
            </label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Confirm Booking
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

export default BookSession;