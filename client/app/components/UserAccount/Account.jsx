import React from "react";
import { getKeyFromStorage, clearStorage } from "../../utils/storage";
import axios from "axios";

const Account = ({ loadingState, tokenState }) => {
  const handleLogOut = () => {
    const obj = getKeyFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      //verify the token
      axios.get("/api/account/logout?token=" + token).then((result) => {
        if (result.data.success) {
          tokenState("");
          loadingState();
          clearStorage();
        } else {
          loadingState();
        }
      });
    } else {
      loadingState();
    }
  };
  return (
    <div>
      <h1>Account</h1>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default Account;
