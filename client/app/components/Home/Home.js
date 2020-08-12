import React, { useState, useEffect } from "react";
import {
  getKeyFromStorage,
  setKeyToStorage,
  clearStorage,
} from "../../utils/storage";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import Register from "./Register";
import Login from "./Login";
import Account from "../UserAccount/Account";

const Home = () => {
  let match = useRouteMatch("/register");
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const obj = getKeyFromStorage("the_main_app");

    if (obj && obj.token) {
      const { token } = obj;
      //verify the token
      axios.get("/api/account/verify?token=" + token).then((result) => {
        if (result.data.success) {
          setToken(token);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (token) {
    return (
      <Account
        loadingState={() => setLoading(false)}
        tokenState={() => setToken()}
      />
    );
  }

  if (match) {
    return <Register loadingState={() => setLoading(false)} />;
  } else {
    return (
      <Login
        loadingState={() => setLoading(false)}
        tokenState={() => setToken()}
      />
    );
  }
};

export default Home;
