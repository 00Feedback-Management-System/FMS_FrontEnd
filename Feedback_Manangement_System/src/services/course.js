import api from "../services/api";

export const getCourses = async () => {
  try {
    const response = await api.get("GetAllCourse");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }

};

export const getCourseById = async (courseId) => {
  try {
    const response = await api.get(`GetCourseById/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${courseId}:`, error);
    throw error;
  }
};