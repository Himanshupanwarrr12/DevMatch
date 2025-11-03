import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import ProfileCard from "./ProfileCard";
import type { User } from "../features/user/userSlice";
import { CheckCircle, X, Save, UserCircle, Plus, XCircle, } from "lucide-react";
import axiosInstance from "@/utils/axios.config";

interface EditProfileProps {
  user: User;
}

const EditProfile = ({ user }: EditProfileProps) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [emailId, setEmailId] = useState(user.emailId || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [currentSkill, setCurrentSkill] = useState("");

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const addSkill = () =>{
    const trimmedSkill = currentSkill.trim()
    if(trimmedSkill && !skills.includes(trimmedSkill)){
      setSkills([...skills, trimmedSkill])
      setCurrentSkill("")
    }
  }

  const removeSkill = (skillToRemove : string) => {
    setSkills(skills.filter ( skill => skill !== skillToRemove))

  }

  const saveProfile = async () => {
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axiosInstance.patch("/profile/edit", {
        firstName,
        lastName,
        about,
        photoUrl,
        gender,
      });

      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500 rounded-full mb-4">
            <UserCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-rose-900 mb-2">
            Edit Profile
          </h1>
          <p className="text-rose-600">Update your personal information</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Profile Preview Card - Left Side */}
          <div className="flex flex-col items-center lg:items-end lg:sticky lg:top-8">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold text-rose-900 mb-6 text-center lg:text-left">
                Profile Preview
              </h2>
              <ProfileCard
                user={{
                  firstName,
                  lastName,
                  emailId,
                  about,
                  gender,
                  photoUrl,
                  skills
                }}
              />
            </div>
          </div>

          {/* Edit Form Card - Right Side */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-rose-200">
            <h2 className="text-2xl font-bold text-rose-900 mb-6">
              Your Information
            </h2>

            <div className="space-y-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 transition text-gray-800"
                  placeholder="Enter your first name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 transition text-gray-800"
                  placeholder="Enter your last name"
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

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 transition text-gray-800 cursor-pointer"
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
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

              {/* skills */}
              <div>
                <label className="block text-sm font-semibold text-rose-900 mb-2">
                  Skills
                </label>
                <div> 
                   <input
                  type="text"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  className="flex-1 px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 transition text-gray-800"
                  placeholder="e.g- React, Node.js"
                />
                <button
                onClick={addSkill}
                 className="px-4 py-3 ml-5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition" >
                  <Plus className="w-4 h-4" />
                </button>
                </div>
                {
                  skills.length > 0 && (
                     <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-rose-600 transition"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                  )
                }              
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
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Profile
                  </>
                )}
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
            <span className="font-semibold text-lg">
              Profile saved successfully!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
