import React from "react";

import { Link } from "react-router-dom";

const Header = () => (
  <div className="relative bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="lg:w-0 lg:flex-1">
          <Link to="/" className="flex">
            <h3>Home</h3>
          </Link>
        </div>

        <div className="py-1 px-1 space-y-6">
          <div className="space-y-6">
            <span className="w-full flex rounded-md">
              <Link
                className="whitespace-no-wrap mr-3 px-4 py-2 text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                to="/"
              >
                Sign In
              </Link>
              <Link
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                to="/register"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
