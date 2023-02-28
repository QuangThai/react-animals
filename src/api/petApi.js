import axiosClient from "./axiosClient";

const petApi = {
  getAll: (params, options) => {
    const url = "/v2/animals";
    return axiosClient.get(url, { params, ...options });
  },
};

export default petApi;
