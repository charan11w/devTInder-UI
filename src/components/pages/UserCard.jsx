import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { removeFromFeed } from "../store/FeedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const sendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFromFeed(res.data.data.toUserId));
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!user)
    return (
      <div className="flex justify-center my-14 text-white-300 text-2xl">
        No New User Found
      </div>
    );
  const { firstName, lastName, gender, age, about, photoURL, _id } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm h-full">
      <figure className="w-[384px] h-[371px] overflow-hidden">
        <img
          src={photoURL}
          alt="photo"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-3 flex flex-col gap-2 flex-grow-0">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p className="text-sm leading-snug mt-1 break-words overflow-hidden">
            {age + ", " + gender}{" "}
          </p>
        )}
        <p className="text-sm  mt-1 break-words overflow-hidden">{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => sendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => sendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
