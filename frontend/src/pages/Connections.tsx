import { setConnections } from "@/features/connection/connectionSlice";
import axiosInstance from "@/utils/axios.config";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "@/components/ProfileCard";

const Connections = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchedConnections = async () => {
    try {
      setLoading(true);
      setError(""); 
      
      const res = await axiosInstance.get("user/connections");
      dispatch(setConnections(res.data?.connections));
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Connection Error:", error.message);
      } else {
        setError("An unexpected error occurred");
        console.error("Unknown Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedConnections();
  }, []);

  const connections = useSelector((store: RootState) => store.connections);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading connections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-700 mb-2">
              Error Loading Connections
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchedConnections}
              className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center mt-8 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-rose-500 mb-8">Connections</h1>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No Connections Yet
          </h2>
          <p className="text-gray-500">
            Start connecting with people to build your network!!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-rose-500 mb-8">Connections</h1>

      <div className="w-full space-y-8">
        {connections.map((connection) => (
          <ProfileCard key={connection._id} user={connection} />
        ))}
      </div>
    </div>
  );
};

export default Connections;
