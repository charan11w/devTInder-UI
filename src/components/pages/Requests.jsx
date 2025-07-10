import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/RequestsSlice.js";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const [toast, setToast] = useState(null);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (message, type, status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      setToast({ message, type });
      setTimeout(() => {
        setToast(null);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (!requests)
    return (
      <div className="flex justify-center text-white-300 text-2xl my-10 font-semibold">
        Loading...
      </div>
    );

  if (requests.length === 0)
    return (
      <div className="flex justify-center text-white-300 text-2xl my-10 font-semibold">
        No Requests Found
      </div>
    );

  return (
    <>
      <div className="flex justify-center my-10 flex-col items-center">
        <h2 className="text-white text-center text-2xl font-bold">Requests</h2>

        <div className="flex flex-col justify-center items-center w-full">
          {requests.length > 0 &&
            requests.map((user, index) => {
              console.log(user);
              console.log(user._id);
              const { firstName, lastName, age, gender, photoURL, about } =
                user.fromUserId;
              return (
                <div
                  key={index}
                  className="flex flex-row w-1/2 bg-base-300 mx-auto my-2 p-4 rounded items-center"
                >
                  <img
                    src={photoURL}
                    className="w-20 h-20 object-cover rounded-full mr-4"
                    alt="Photo"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold">
                      {firstName + " " + lastName}
                    </h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                  </div>

                  {/* Accept / Reject Buttons */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        reviewRequest(
                          "Accepted Request !!",
                          "success",
                          "accepted",
                          user._id
                        )
                      }
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() =>
                        reviewRequest("Rejected Request !!", "success")
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {toast && (
        <div className="toast toast-top toast-center z-199 ">
          <div className={`alert alert-${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Requests;
