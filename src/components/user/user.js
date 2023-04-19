import React from "react";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";

export default function User({ user }) {
  return (
    <div
      style={{
        width: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Avatar
        alt="user avatar"
        src={"http://127.0.0.1:8000" + user.profile.image}
      />
      <h4
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        {user.username}
      </h4>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      image: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
