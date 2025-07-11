import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { logout } from "../store/AuthSlice";
import { removeFeed } from "../store/FeedSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await axios.post(BASE_URL + "/logout", null, { withCredentials: true });
      dispatch(logout());
      dispatch(removeFeed());
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <div className="navbar bg-base-200 shadow-sm ">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            devTinder
          </Link>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <div className="form-control">Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <a onClick={logoutUser}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
