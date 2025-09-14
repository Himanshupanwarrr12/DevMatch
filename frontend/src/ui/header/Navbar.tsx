import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="h-[80px] bg-violet-600 w-full p-2 flex justify-between ">
        <div className="">
          <NavLink to="/" className="text-xl text-black ">DevMatch</NavLink>
        </div>
        <div>
          Profile
          <div>
            <img 
            className="h-[16px] w-[16px]"
             src="https://www.shutterstock.com/shutterstock/photos/1677509740/display_1500/stock-vector-default-avatar-profile-icon-social-media-user-vector-1677509740.jpg" alt="user pic" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

