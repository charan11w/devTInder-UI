import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [userDetails, setUserDetails] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const {
    emailId = "",
    password = "",
    firstName = "",
    lastName = "",
  } = userDetails;

  const saveUserDetails = (event) => {
    const { name, value } = event.target;

    setUserDetails((pre) => ({
      ...userDetails,
      [name]: value,
    }));
  };

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(login(response.data.data));
      navigate("/");
    } catch (error) {
      setError((pre) => error.response.data.error);
      console.error("Login error:", error);
    }

    return;
  };

  const signUpUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(login(response.data.user));
      navigate("/profile");
    } catch (error) {
      setError((pre) => error.response.data.error);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center my-15">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoggedIn ? "Login" : "Sign up"}
          </h2>
          {/* wrap in form */}
          <form onSubmit={isLoggedIn ? loginUser : signUpUser}>
            {!isLoggedIn && (
              <>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Your First Name"
                    value={firstName}
                    name="firstName"
                    onChange={saveUserDetails}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Your Last Name"
                    value={lastName}
                    name="lastName"
                    onChange={saveUserDetails}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter Your email"
                value={emailId}
                name="emailId"
                onChange={saveUserDetails}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Enter Your password"
                value={password}
                name="password"
                onChange={saveUserDetails}
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center mt-4">
              <button type="submit" className="btn btn-primary">
                {isLoggedIn ? "Login" : "Sign up"}
              </button>
            </div>
          </form>
          <p className="text-center mt-2">
            {isLoggedIn ? (
              <>
                New User?,{" "}
                <span
                  onClick={() => setIsLoggedIn(false)}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Signup Here
                </span>
              </>
            ) : (
              <>
                Existing User?,{" "}
                <span
                  onClick={() => setIsLoggedIn(true)}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Login Here
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
