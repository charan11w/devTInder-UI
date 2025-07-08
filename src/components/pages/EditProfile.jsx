import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [userDetails, setUserDetails] = useState(user || {});

  useEffect(() => {
    setUserDetails(user || {});
  }, [user]);

  const { firstName, lastName, photoURL, age, gender, about } = userDetails;

  const inputDetails = [
    { label: "First Name", value: firstName, name: "firstName" },
    { label: "Last Name", value: lastName, name: "lastName" },
    { label: "Photo URL", value: photoURL, name: "photoURL" },
    { label: "Age", value: age, name: "age" },
    { label: "Gender", value: gender, name: "gender" },
    { label: "About", value: about, name: "about" },
  ];

  const handleInputs = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setUserDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-10">
      <UserCard user={userDetails} />
      <div className="flex justify-center ">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            {/* wrap in form */}
            <form>
              {inputDetails &&
                inputDetails.map((field) => (
                  <fieldset className="fieldset my-2">
                    <legend className="fieldset-legend">{field.name}</legend>
                    <input
                      type="text"
                      className="input"
                      value={field.value}
                      name={field.name}
                      onChange={handleInputs}
                    />
                  </fieldset>
                ))}

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
  );
};

export default EditProfile;
