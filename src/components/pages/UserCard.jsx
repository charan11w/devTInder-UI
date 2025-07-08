import React from "react";
import { useSelector } from "react-redux";

const UserCard = ({ user }) => {
  const { firstName, lastName, gender, age, about, photoURL } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm h-full">
      <figure>
        <img src={photoURL} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + { gender }} </p>}
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
