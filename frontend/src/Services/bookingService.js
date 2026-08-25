import axios from "axios";

const API = "http://localhost:5000/api/bookings";

// Create Booking
export const createBooking = async (bookingData, token) => {

  const response = await axios.post(
    API,
    bookingData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getStudentBookings = async (token) => {

  const response = await axios.get(
    "http://localhost:5000/api/bookings/student",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};