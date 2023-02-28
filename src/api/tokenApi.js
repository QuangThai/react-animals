import axiosClient from "./axiosClient";

const tokenApi = {
  getToken: (data) => {
    const url = "/v2/oauth2/token";
    return axiosClient.post(url, data);
  },
};

export default tokenApi;
