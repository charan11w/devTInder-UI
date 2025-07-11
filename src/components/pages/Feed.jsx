import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToFeed } from "../store/FeedSlice";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((state) => state.feed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addToFeed(res.data.data));
    } catch (err) {
      console.error(err.message);
      setError("Server is starting... please wait ⏳");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex justify-center my-14">
      {loading && (
        <div className="flex justify-center my-14 text-white-300 text-2xl">
          waking up the server please wait
        </div>
      )}
      {error && (
        <div className="flex justify-center my-14 text-white-300 text-2xl">
          Error in the Backend
        </div>
      )}
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
