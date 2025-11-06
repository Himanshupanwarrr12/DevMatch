import { setConnections } from "@/features/connection/connectionSlice";
import axiosInstance from "@/utils/axios.config";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "@/components/ProfileCard";

const Connections = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const fetchedConnections = async () => {
    try {
      const res = axiosInstance.get("user/connections");
      // console.log("res of connections : ", (await res).data.connections);
      dispatch(setConnections((await res).data.connections));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Feed Error:", error.message);
      } else {
        setError("An unexpected error occurred");
        console.error("Unknown Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchedConnections();
  }, []);

  const connections = useSelector((store:RootState)=> store.connections)
  if(!connections) return

 return(
  <div className="flex flex-col items-center mt-8 px-4 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-rose-500 mb-8">Connections</h1>
    
    {connections.length > 0 ? (
      <div className="w-full space-y-4">
        {connections.map((connection) => (
          <ProfileCard key={connection._id} user={connection} />
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No Connections Yet</h2>
        <p className="text-gray-500">Start connecting with people to build your network!!</p>
      </div>
    )}
  </div>
)
};

export default Connections;
