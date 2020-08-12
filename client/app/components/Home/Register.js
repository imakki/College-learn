import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = ({ loadingState }) => {
  const history = useHistory();
  const [signUpError, setSignUpError] = useState("");
  const [signUpemail, setSignUpEmail] = useState("");
  const [signUppassword, setSignUpPassword] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");

  const handleOnChangeTextboxSignUpEmail = (e) => {
    setSignUpEmail(e.target.value);
  };
  const handleOnChangeTextboxSignUpPassword = (e) => {
    setSignUpPassword(e.target.value);
  };
  const handleOnChangeTextboxSignUpFirstName = (e) => {
    setSignUpFirstName(e.target.value);
  };
  const handleOnChangeTextboxSignUpLastName = (e) => {
    setSignUpLastName(e.target.value);
  };

  const handleSignUp = () => {
    axios
      .post("/api/account/signup", {
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpemail,
        password: signUppassword,
      })
      .then((result) => {
        setSignUpError(result.data.message);
        loadingState();
        history.push("/");
      });
  };

  return (
    <div>
      <div classNameName="flex flex-col items-center">
        {signUpError ? <p>{signUpError}</p> : ""}
        <div className="h-100 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Register
              </h2>
            </div>
            <div className="mt-8">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm">
                <div>
                  <input
                    value={signUpemail}
                    onChange={handleOnChangeTextboxSignUpEmail}
                    aria-label="Email address"
                    name="email"
                    type="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Email address"
                  />
                </div>
                <div className="-mt-px">
                  <input
                    value={signUppassword}
                    onChange={handleOnChangeTextboxSignUpPassword}
                    aria-label="Password"
                    name="password"
                    type="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Password"
                  />
                </div>
                <div className="-mt-px">
                  <input
                    value={signUpFirstName}
                    onChange={handleOnChangeTextboxSignUpFirstName}
                    aria-label="Firstname"
                    name="firstname"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Firstname"
                  />
                </div>
                <div className="-mt-px">
                  <input
                    value={signUpLastName}
                    onChange={handleOnChangeTextboxSignUpLastName}
                    aria-label="Lastname"
                    name="lastname"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Lastname"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSignUp}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
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
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
