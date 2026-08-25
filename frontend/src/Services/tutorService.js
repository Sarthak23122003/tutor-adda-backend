import axiosInstance from "../api/axios";

export const getAllTutors = async () => {

  const response = await axiosInstance.get("/tutors");

  return response.data;
};
export const getSingleTutor = async (id) => {

  const response = await axiosInstance.get(`/tutors/${id}`);

  return response.data;
};