import { Box, Typography } from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Box
      sx={{
        padding: "2px 5px",
        borderRadius: "10px",
        color: "primary",
        display: "flex",
        flexDirection: "row",
        gap: "3px",
        alignItems: "center",
        backgroundColor: "beige",
      }}
    >
      <Typography>
        {user.name}
        {admin === user._id && <span> (Admin)</span>}
      </Typography>
      <IoCloseCircleOutline onClick={handleFunction} cursor="pointer" />
    </Box>
  );
};

export default UserBadgeItem;
