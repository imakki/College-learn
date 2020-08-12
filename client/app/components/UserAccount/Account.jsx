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
      <button
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
