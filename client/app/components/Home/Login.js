import React, { useState } from "react";
import {
  setKeyToStorage,
  getKeyFromStorage,
  clearStorage,
} from "../../utils/storage";
import axios from "axios";

const Login = ({ loadingState, tokenState }) => {
  const [signInError, setSignInError] = useState("");
  const [signInemail, setSignInEmail] = useState("");
  const [signInpassword, setSignInPassword] = useState("");

  const handleOnChangeTextboxSignInEmail = (e) => {
    setSignInEmail(e.target.value);
  };
  const handleOnChangeTextboxSignInPassword = (e) => {
    setSignInPassword(e.target.value);
  };

  const handleSignIn = () => {
    axios
      .post("/api/account/signin", {
        email: signInemail,
        password: signInpassword,
      })
      .then((result) => {
        if (result.data.success) {
          setKeyToStorage("the_main_app", { token: result.data.token });
          setSignInEmail("");
          setSignInPassword("");
          loadingState();
          //   setToken(result.data.token);
          tokenState(result.data.token);
        } else {
          setSignInError(result.data.message);
          loadingState();
        }
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        {signInError ? <p>{signInError}</p> : ""}

        <div class="h-100 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div class="max-w-md w-full">
            <div>
              <img
                class="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                alt="Workflow"
              />
              <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <div class="mt-8">
              <input type="hidden" name="remember" value="true" />
              <div class="rounded-md shadow-sm">
                <div>
                  <input
                    value={signInemail}
                    onChange={handleOnChangeTextboxSignInEmail}
                    aria-label="Email address"
                    name="email"
                    type="email"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Email address"
                  />
                </div>
                <div class="-mt-px">
                  <input
                    value={signInpassword}
                    onChange={handleOnChangeTextboxSignInPassword}
                    aria-label="Password"
                    name="password"
                    type="password"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div class="mt-6 flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label
                    for="remember_me"
                    class="ml-2 block text-sm leading-5 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div class="text-sm leading-5">
                  <a
                    href="#"
                    class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div class="mt-6">
                <button
                  onClick={handleSignIn}
                  type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
