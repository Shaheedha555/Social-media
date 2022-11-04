import axios from "../../Axios";

const sendOTP = async (data) => {
  const response = await axios.post("/sendOTP", { data });
  console.log("axios otp sent");

  return response.data;
};

const verifyOTP = async (data) => {
  console.log(data);
  const response = await axios.post("/verifyOTP", { data });
  if (response.data.status) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const verifyService = {
  sendOTP,
  verifyOTP,
};

export default verifyService;
