import axios from "axios";

//export const BASE_URL = "http://localhost:8087";
export const BASE_URL = "http://localhost/";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
