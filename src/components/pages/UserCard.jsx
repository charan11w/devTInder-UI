import React from "react";
import { useSelector } from "react-redux";

const UserCard = ({ user }) => {
  const { firstName, lastName, gender, age, about, photoURL } = user;
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
