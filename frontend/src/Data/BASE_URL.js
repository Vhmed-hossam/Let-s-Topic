const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://letstopic.up.railway.app";
export default BASE_URL;
