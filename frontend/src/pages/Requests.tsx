import axiosInstance from "@/utils/axios.config";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Requests = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const fetchedRequests = async () => {
    try {
      const res = await axiosInstance.get("/user/requests/recieved");
      console.log("Res of requests : ", res.data.data);
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
    fetchedRequests();
  }, []);

  return <div> cooking...</div>;
};

export default Requests;
