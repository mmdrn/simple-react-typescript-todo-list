import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const Signup = async (data) => axios.post(`${backendUrl}api/signup`, data);
const Login = async (data) => axios.post(`${backendUrl}api/login`, data);

export { Signup, Login };
