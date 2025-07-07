import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { login } from "../store/AuthSlice";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      const { data } = res;
      console.log(data);
      dispatch(login(data));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>
    );
  }

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
