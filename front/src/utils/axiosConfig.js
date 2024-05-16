import axios from "axios";

// const baseURL = process.env.NODE_ENV === "development"
//   ? "http://localhost:3000/"
//   : "http://example.com"
const baseURL = "http://localhost:8800/api";
export const axiosRequest = axios.create({
  baseURL,
  withCredentials: true,
});
