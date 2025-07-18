import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { login } from "../store/AuthSlice";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      const { data } = res;
      dispatch(login(data.data));
      navigate("/profile");
    } catch (err) {
      navigate("/login");
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <NavBar />
      </nav>
      <main className="flex-grow pt-16 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
