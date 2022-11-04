import axios from "../../Axios";
const user = JSON.parse(localStorage.getItem("user"));

const config = {
  headers: {
    Authorization: `Bearer ${user?.token}`,
  },
};

const searchUser = async (keyword) => {
  const response = await axios.get(`chat/search/?search=${keyword}`, config);
  return response;
};

const getChat = async (id) => {
  const response = await axios.post("/chat", { userId: id }, config);
  return response;
};
const getAllChat = async () => {
  console.log("alll chat");
  const response = await axios.get("/chat", config);
  return response;
};
const getAllMessages = async (chatId) => {
  console.log("all msgs");
  const response = await axios.get(`/message/${chatId}`, config);
  return response;
};

const chatService = {
  searchUser,
  getChat,
  getAllChat,
  getAllMessages,
};
export default chatService;
