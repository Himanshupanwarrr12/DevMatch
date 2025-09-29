import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";

const Navbar = () => {
  const  user = useSelector((store : RootState)=>store.user.user)
  // console.log("user : ",user)
  return (
    <div className="h-[60px] bg-pink-600 w-full p-2 flex justify-between items-center">
      <NavLink to="/" className="text-xl text-white">
        DevMatch
      </NavLink>
      
      <div className="flex items-center gap-4 text-xl">
        <h3>{user?.firstName}</h3>
        <img 
          className="h-8 w-8 rounded-full"
          src="https://www.shutterstock.com/shutterstock/photos/1677509740/display_1500/stock-vector-default-avatar-profile-icon-social-media-user-vector-1677509740.jpg" 
          alt="User profile picture" 
        />
      </div>
    </div>
  );
};

export default Navbar;