import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToFeed } from "../store/FeedSlice";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((state) => state.feed);

  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addToFeed(res.data.data));
    } catch (err) {
      console.err(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex justify-center my-14">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
