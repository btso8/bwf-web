import React from "react";
import { Routes, Route } from "react-router-dom";
import GroupDetails from "../group/group-details";
import GroupList from "../group/group-list";
import Register from "../user/register";
import Account from "../user/account";

function Main() {
  return (
    <div className="main">
      <Routes>
        <Route exact path="/" element={<GroupList />} />
        <Route path="/details/:id" element={<GroupDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default Main;
