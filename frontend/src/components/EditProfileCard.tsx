import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice"
import ProfileCard from "./ProfileCard";
import type { User } from "../features/user/userSlice";

interface editProfileCard{
  user:User
}

const EditProfile = ({ user }:editProfileCard) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [emailId, setEmailId] = useState(user.emailId);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        baseUrl + "/profile/edit",
        { firstName, emailId, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
      },3000)
    } catch (error:unknown) {
      if(error instanceof Error){
          setError(error.message);
      console.log("Error:" + error.message);
      }
      else{
        setError("An unexpected error occurred");
        console.error("Unknown Error:", error);
      }
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center">
        <div className="mr-3 gap-x-4 h-min overflow-clip bg-gray-800 border-black border-2  w-auto m-2 p-5  ">
          <h1 className="mb-5 text-center text-white text-2xl font-bold ">
            Profile Picture
          </h1>
          <ProfileCard user={{ firstName, emailId, about, photoUrl }} />
        </div>
        <div className="mr-3 gap-x-4 h-min bg-gray-900 overflow-clip border-3  w-auto m-2 p-6  ">
          <h1 className="mb-4 text-center text-2xl text-white font-bold ">
            Edit Profile
          </h1>
          {/* label for first name */}
          <label>
            <div>
              <p className="font-bold m-1 text-white ">First Name:</p>
              <input
                type="text"
                value={firstName}
                className="border-2 border-black bg-gray-800 p-2 text-white "
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </label>
          {/* label for emailId */}
          <label>
            <div>
              <p className="font-bold m-1 text-white ">EmailId:</p>
              <input
                type="text"
                value={emailId}
                className="border-2 border-black bg-gray-800 p-2 text-white"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
          </label>
          {/* label for about */}
          <label>
            <div>
              <p className="font-bold m-1 text-white ">About:</p>
              <input
                type="text"
                value={about}
                className="border-2 border-black bg-gray-800 p-2 text-white"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </label>
          {/* label for photourl */}
          <label>
            <div>
              <p className="font-bold text-white m-1 ">Photo Url:</p>
              <input
                type="text"
                value={photoUrl}
                className="border-2 border-black bg-gray-800 p-2 text-white "
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <p className="text-red-600 text-2xl -">{error}</p>
          </label>
          <div className="card-actions justify-center mt-5">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save profile
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully!!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;