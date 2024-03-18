import { axiosInstance } from ".";

// ADD NEW THEATRE
export const AddTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// GET TO SHOW THEATRES IN LIST
export const GetAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// GET THEATRES INFO ONLY OWNER
export const GetAllTheatresByOwner = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-owner",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// UPDATE THEATRE INFO
export const UpdateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/update-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// DELETE THEATRE
export const DeleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/delete-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// ADD NEW MOVIE TO THEATRE
export const AddShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// GET ALL MOVIE THAT IN THEATRE
export const GetAllShowsByTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-shows-by-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// DELETE MOVIE SHOW IN THEATRE
export const DeleteShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/delete-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// GET ALL THEATRES THAT SHOW MOVIE IN THIS TIME
export const GetAllTheatresByMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-movie",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// GET MOVIE SHOW BY ID
export const GetShowById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-show-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// *******
