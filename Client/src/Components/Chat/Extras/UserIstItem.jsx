import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const UserListItem = ({ handleFunction, user }) => {
  //   const { user } = useSelector((state) => state.chat);

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      backgroundColor="#E8E8E8"
      //   hover={{
      //     background: "#38B2AC",
      //     color: "white",
      //   }}
      width="70%"
      display="flex"
      alignItems="center"
      color="black"
      padding="3px 5px"
      marginBottom={"2px"}
      borderRadius="10px"
    >
      <Avatar cursor="pointer" name={user.name} src={user.pic} />
      <Box>
        <Typography>{user.name}</Typography>
        <Typography fontSize="xs" sx={{ display: { xs: "none", sm: "block" } }}>
          <b>Email : </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
