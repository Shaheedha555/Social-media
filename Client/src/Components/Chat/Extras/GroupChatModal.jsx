import { useDispatch, useSelector } from "react-redux";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserIstItem";
import { createGroupChat, searchUser } from "../../../Features/Chat/chatSlice";
import {
  Button,
  FormControl,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { Box } from "@mui/system";
import { useState } from "react";
const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      //   toast({
      //     title: "User already added",
      //     status: "warning",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "top",
      //   });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const { payload } = await dispatch(searchUser(search));
      setLoading(false);
      setSearchResult(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      console.log("Please fill all the feilds");
      return;
    }

    try {
      const { payload } = await dispatch(
        createGroupChat({
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
          name: groupChatName,
        })
      );
      //   setChats([payload, ...chat]);
      setOpen(false);
    } catch (error) {
      //   toast({
      //     title: "Failed to Create the Chat!",
      //     description: error.response.data,
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "bottom",
      //   });
      console.log(error);
    }
  };
  const style = {};
  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>

      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80vw", sm: "400px" },
            backgroundColor: "white",
            border: "2px solid #000",
            borderRadius: "15px",
            boxShadow: 24,
            padding: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Typography
              fontSize="25px"
              fontFamily="Work sans"
              display="flex"
              justifyContent="center"
            >
              Create Group Chat
            </Typography>
            <IoClose onClick={() => setOpen(false)} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={"0.5rem"}
            overflow={"scroll"}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <FormControl>
                <TextField
                  size="small"
                  sx={{ marginBottom: "0.5rem" }}
                  placeholder="Chat Name"
                  variant="outlined"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Add Users"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box
              width="100%"
              display="flex"
              //   flexWrap={"wrap"}
              gap={"0.5rem"}
              overflow={"auto"}
            >
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                  admin={user._id}
                />
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                width: "100%",
                overflow: "auto",
              }}
            >
              {loading ? (
                // <ChatLoading />
                <div>Loading...</div>
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </Box>
          </Box>
          <Box textAlign={"right"} marginTop="1rem">
            <Button onClick={handleSubmit} variant="contained">
              Create Chat
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default GroupChatModal;
