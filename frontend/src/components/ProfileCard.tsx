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
    <div className="bg-white p-4 pl-5 pr-5 w-full max-w-[350px] mx-auto shadow-2xl rounded-2xl">
      <div className="flex justify-center">
        <img
          alt="img"
          src={photoUrl}
          className=" object-cover p-2 m-2 rounded-full h-40 w-40 "
        />
      </div>

      <div className="p-3">
        <h3 className="text-center text-rose-700  font-bold text-xl">
          {firstName} {lastName}
        </h3>
        <p className="text-center">{gender}</p>
        <p className="text-center font-semibold p-1 m-1 text-gray-600 font-serif">
          {skills}
        </p>
        <p className="text-center">{about}</p>
        <p className="text-center">{futureInterest}</p>
      </div>

      <div className="mt-2 text-blue-800 font-semibold">
        <a href="https://github.com">{links}</a>
      </div>
    </div>
  );
};

export default ProfileCard;
