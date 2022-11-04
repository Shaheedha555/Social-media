import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const ChatLoading = () => {
  return (
    <>
      <Stack marginLeft={2} marginRight={2} spacing={2}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            width={50}
            height={50}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={190}
            height={20}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            width={50}
            height={50}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={190}
            height={20}
          />
        </div>
      </Stack>
    </>
  );
};

export default ChatLoading;
