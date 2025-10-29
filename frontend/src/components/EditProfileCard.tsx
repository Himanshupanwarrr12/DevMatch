import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import ProfileCard from "./ProfileCard";
import type { User } from "../features/user/userSlice";
import { CheckCircle, X, Save, UserCircle } from "lucide-react";
import axiosInstance from "@/utils/axios.config";

interface EditProfileProps {
  user: User;
}

const EditProfile = ({ user }: EditProfileProps) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [emailId, setEmailId] = useState(user.emailId || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);


  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setError("");
      const res = axiosInstance.patch(
        "/profile/edit",
        { firstName,  about, photoUrl }
      );
      console.log("res : ",(await res).data)
      // dispatch(addUser(res));
      setShowToast(true);
      
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Feed Error:", error.message);
      } else {
        setError("An unexpected error occurred");
        console.error("Unknown Error:", error);
      }
    }  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500 rounded-full mb-4">
            <UserCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-rose-900 mb-2">Edit Profile</h1>
          <p className="text-rose-600">Update your personal information</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-rose-200 h-fit">
            <h2 className="text-2xl font-bold text-rose-900 mb-6 text-center">
              Profile Preview
            </h2>
            <ProfileCard user={{ firstName, emailId, about, photoUrl }} />
          </div>

          {/* Edit Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-rose-200">
            <h2 className="text-2xl font-bold text-rose-900 mb-6">
              Your Information
            </h2>

            <div className="space-y-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 transition text-gray-800"
                  placeholder="Enter your first name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 transition text-gray-800"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* About */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2">
                  About You
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 transition resize-none text-gray-800"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 transition text-gray-800"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={saveProfile}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              > 
                  <>
                    <Save className="w-5 h-5" />
                    Save Profile
                  </>
                
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold text-lg">Profile saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;