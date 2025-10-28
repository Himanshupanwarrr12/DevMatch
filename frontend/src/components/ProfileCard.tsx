import type { User } from "@/features/user/userSlice";

interface profileCardProps {
  user:User
}

const ProfileCard = ({user}:profileCardProps) => {

  const {photoUrl,firstName,skills,about,futureInterests} = user
  
  return (
    <div className="  bg-white p-4 pl-5 pr-5 w-[350px] shadow-2xl ">
      <div className=" flex justify-center ">
        <img
          alt=" img"
          src={photoUrl}
          className=" border-4 object-cover p-2 m-2 rounded-full h-40 w-40  border-gray-300"
        />
      </div>

      <div className="p-3 ">
        <h3 className="text-center text-rose-700 pb-2 font-bold text-2xl">
          {firstName}{" "}
        </h3>
        <p className="text-center font-semibold p-1 m-1 text-gray-600 font-serif">
          {skills}
        </p>
        <p className="text-center ">{about}</p>
        <p className="text-center">{futureInterests}</p>
      </div>

      <div className="mt-2 text-blue-800 font-semibold">
        <a href="https://github.com">Github</a>
      </div>
    </div>
  );
};

export default ProfileCard