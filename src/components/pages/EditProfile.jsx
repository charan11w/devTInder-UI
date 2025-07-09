import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { login } from "../store/AuthSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [userDetails, setUserDetails] = useState(user || {});
  const [toast, setToast] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setUserDetails(user);
  }, []);

  const { firstName, lastName, photoURL, age, gender, about } = userDetails;

  const inputDetails = [
    {
      label: "First Name",
      value: firstName,
      name: "firstName",
      min: 4,
      max: 15,
    },
    { label: "Last Name", value: lastName, name: "lastName", min: 4, max: 15 },
    { label: "Photo URL", value: photoURL, name: "photoURL" },
    { label: "Age", value: age, name: "age", min: 1, max: 2 },
    {
      label: "Gender",
      value: gender,
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { label: "About", value: about, name: "about", min: 8, max: 50 },
  ];

  const saveProfile = async (e) => {
    e.preventDefault();
    console.log(gender);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(login(res.data.data));
      setError("");
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }
  };
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setUserDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-10">
        <UserCard user={userDetails} />
        <div className="flex justify-center ">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              {/* wrap in form */}
              <form onSubmit={saveProfile}>
                {inputDetails &&
                  inputDetails.map((field, index) => (
                    <fieldset className="fieldset my-2" key={index}>
                      <legend className="fieldset-legend">{field.name}</legend>
                      {field.type === "select" ? (
                        <select
                          className="input"
                          name={field.name}
                          value={field.value || ""}
                          onChange={handleInputs}
                          required
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {field.options.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="input"
                          value={field.value || ""}
                          name={field.name}
                          onChange={handleInputs}
                          minLength={field.min}
                          maxLength={field.max}
                          required
                        />
                      )}
                    </fieldset>
                  ))}
                <p className="text-red-300">{error}</p>
                <div className="card-actions justify-center mt-4">
                  <button type="submit" className="btn btn-primary">
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <div className="toast toast-top toast-center z-199">
          <div className="alert alert-success">
            <span>Profile saved Successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
