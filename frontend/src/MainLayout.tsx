import { Outlet } from "react-router-dom";
import Footer from "./ui/footer/Footer";
import Navbar from "./ui/header/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./features/user/userSlice";
import axiosInstance from "./utils/axios.config";
import type { RootState } from "./store/store";

const MainLayout = () => {
  const dispatch = useDispatch();
  const user =  useSelector((store:RootState)=> store.user)

    const fetchUser = async () => {
    console.log("USER VALUE:", user, "TYPE:", typeof user)

    if(user){
      return ;
    }
     else{
       try {
        const res = await axiosInstance.get("/profile/view");
        dispatch(addUser(res.data.user));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Error : ", error);
        } else {
          console.log("Unexpected Error : ", error);
        }
      }
     }
    };

    useEffect(()=>{
      fetchUser()
    },[])

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
