import axios from "axios";
const BASE_URL = "http://localhost:5000";
// const token = (localStorage.getItem('user').token)

const instance = axios.create({
  baseURL: BASE_URL,
  // headers: { 'Content-Type': 'application/json' },
  // withCredentials: true
});
// export const axiosPrivate = axios.create({
//     baseURL: BASE_URL,
//     headers: { 'Content-Type': 'application/json','Authorization' : `Bearer ${token}`  },
//     // withCredentials: true
// });
export default instance;
