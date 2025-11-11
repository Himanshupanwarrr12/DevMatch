import { setRequests } from "@/features/request/requestsSlice";
import axiosInstance from "@/utils/axios.config";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const Requests = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const fetchedRequests = async () => {
    try {
      const res = await axiosInstance.get("/user/requests/recieved");
      console.log("Res of requests : ", res.data.data);
      dispatch(setRequests(res.data.data))
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


  const requests = useSelector((store:RootState)=> store.requests)

  if(!requests) return null;
  if(requests.length === 0) return <p className="text-red-600 text-2xl text-center">No requests found</p>

  return (
    <div className="flex flex-col gap-5  py-4">
      <h1 className="text-white text-3xl text-center font-bold">Requests</h1>

      { requests.map((requestObj)=>{
        console.log(" RequestObj : ",requestObj.fromUserId)
        
        return(
          <div key={requestObj._id}> HI </div>s
        )
        
      }) }

      
    </div>
  )
};

export default Requests;
