import React from "react";
import User from "../user/user";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";


function Comment({ comment, user }) {
  const theme = useTheme();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <User user={user} />

      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            position: "relative",
            padding: "5px",
            backgroundColor: theme.colors.bgLighterColor,
            borderRadius: "5px",
            border: `5px solid ${theme.colors.bgLighterColor}`,
          }}
        >
          <span
            style={{
              width: "0",
              height: "0",
              position: "absolute",
              background: "transparent",
              border: `10px solid ${theme.colors.bgLighterColor}`,
              top: "5px",
              left: "-25px",
              borderTopColor: "transparent",
              borderLeftColor: "transparent",
              borderBottomColor: "transparent",
            }}
          >
            &nbsp;
          </span>
          <div style={{ color: theme.colors.bgColor }}>
            <span>{comment.description}</span>
          </div>
        </div>
        <Typography sx={{ float: "right" }}>
          {comment.time.split("T")[0]} &nbsp;
          {comment.time.split("T")[1].substring(0, 5)}
        </Typography>
      </div>
    </div>
  );
}

export default Comment;
