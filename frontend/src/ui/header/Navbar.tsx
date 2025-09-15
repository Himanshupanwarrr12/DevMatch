import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="h-[60px] bg-stone-500 w-full p-2 flex justify-between items-center ">
        <div className="">
          <NavLink to="/" className="text-xl items-center  text-white ">DevMatch</NavLink>
        </div>
        <div className="flex justify-center items-center gap-4 text-xl" >
          <h1 className="text-white" >
            Profile
          </h1>
          <div>
            <img 
            className="h-[32px] w-[32px]"
             src="https://www.shutterstock.com/shutterstock/photos/1677509740/display_1500/stock-vector-default-avatar-profile-icon-social-media-user-vector-1677509740.jpg" alt="user pic" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

