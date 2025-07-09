import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constants.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/ConnectionSlice.js";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <>error</>;

  if (connections.length === 0)
    return (
      <div className="test-center text-white-300 text-2xl">
        No COnnections Found
      </div>
    );

  return (
    <div className="flex justify-center my-10 flex-col items-center">
      <h2 className="text-white text-center text-2xl font-bold">Connections</h2>

      <div className="flex flex-col justify-center items-center w-full">
        {connections &&
          connections.map((user, index) => {
            const { firstName, lastName, age, gender, photoURL, about } = user;
            return (
              <div
                key={index}
                className="flex flex-row w-1/2 bg-base-300 mx-auto my-2 p-4 rounded"
              >
                <img
                  src={photoURL}
                  className="w-20 h-20 object-cover rounded-full mr-4"
                  alt="User"
                />
                <div>
                  <h2 className="font-semibold">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Connections;
