const { axiosInstance } = require(".");

// ADD NEW MOVIE
export const AddMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// DISPLAY ALL MOVIE
export const GetAllMovies = async () => {
  try {
      const response = await axiosInstance.get("/api/movies/get-all-movies");
      return response.data;
  } catch (error) {
      return error.response;
  }
}

// UPDATE MOVIE DETAILS
export const UpdateMovie = async (payload) => {
  try {
      const response = await axiosInstance.post("/api/movies/update-movie", payload);
      return response.data;
  } catch (error) {
      return error.response;
  }
}

// DELETE MOVIE
export const DeleteMovie = async (payload) => {
  try {
      const response = await axiosInstance.post("/api/movies/delete-movie", payload);
      return response.data;
  } catch (error) {
      return error.response;
  }
}

// GET MOVIE BY ID
export const GetMovieById = async (id) => {
  try {
      const response = await axiosInstance.get(`/api/movies/get-movie-by-id/${id}`);
      return response.data;
  } catch (error) {
      return error.response;
  }
}

// *******