import React from 'react';
import type { User } from "@/features/user/userSlice";

interface ProfileCardProps {
  user: Partial<User>; 
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const {
    firstName,
    lastName,
    about,
    gender,
    photoUrl,
    skills,
    futureInterest,
    links,
  } = user;

  console.log("Links" ,links)

  return (
    <div className="bg-white w-full max-w-[380px] mx-auto shadow-xl rounded-2xl overflow-hidden">
      <div className="relative h-[300px] bg-gray-200">
        <img
          alt="img"
          src={photoUrl}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Name and Gender Section */}
      <div className="p-5 pb-3 flex justify-between items-start">
        <h2 className="text-3xl font-bold text-black">
          {firstName} {lastName}
        </h2>
        {gender && (
          <p className="text-lg font-bold text-rose-500 mt-2">{gender}</p>
        )}
      </div>

      <div className="px-5 pb-5">
        {skills && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Skills</p>
            <p className="text-gray-800 font-medium">{skills + " "}</p>
          </div>
        )}

        {about && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase ">About</p>
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
              {about}
            </p>
          </div>
        )}

        {futureInterest && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Future Interest</p>
            <p className="text-gray-900 font-medium">{futureInterest + " "}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;