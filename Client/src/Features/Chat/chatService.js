import axios from "../../Axios";
const user = JSON.parse(localStorage.getItem("user"));
console.log(user, " uss");
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
  console.log("alll");
  const response = await axios.get("/chat", config);
  console.log(response);
  return response;
};
const getAllMessages = async (chatId) => {
  const response = await axios.get(`/message/${chatId}`, config);
  return response;
};
const sendMessage = async (data) => {
  const response = await axios.post(`/message/send`, data, config);
  return response;
};
const createGroupChat = async (data) => {
  const response = await axios.post(`/chat/group`, data, config);
  return response;
};
const renameGroup = async (data) => {
  const response = await axios.put(`/chat/group/rename`, data, config);
  return response;
};
const removeFromGroup = async (data) => {
  const response = await axios.post(`/chat/group/remove`, data, config);
  return response;
};
const addToGroup = async (data) => {
  const response = await axios.post(`/chat/group/add`, data, config);
  return response;
};
const chatService = {
  searchUser,
  getChat,
  getAllChat,
  getAllMessages,
  sendMessage,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
export default chatService;
