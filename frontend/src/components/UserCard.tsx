import type { User } from "@/features/user/userSlice";

interface userCardProps {
  user : User
}

const UserCard = ({user}:userCardProps) => {

  if(!user) return <div>User not found!!</div>
  
  const {_id,firstName,skills,gender,about,photoUrl,futureInterests} = user
  
  return (
    <div className="flex   justify-center bg-gray-100 p-4   w-auto">
      <div className="  bg-white p-4 pl-5 pr-5 w-[350px] shadow-2xl ">
        <div className=" flex justify-center ">
          <img
            alt=" img"
            src={photoUrl}
            className=" border-4 object-cover p-2 m-2 rounded-full h-52 w-52  border-rose-400"
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

        <div className="mt-2 text-blue-800 ml-8 font-semibold">
          <a href="https://github.com">Github</a> | 
          <a href="https://linkedIn.com"> LinkedIn</a> | 
          <a href="https://x.com"> Twitter</a> 
        </div>

        <div className="flex gap-4 m-4 p-2">
          <button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">Interested</button>
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
