import { useEffect, useRef, useState } from "react";
import type { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axios.config";
import { removeUser } from "@/features/user/userSlice";

const Navbar = () => {
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    axiosInstance.post("/logout");
    dispatch(removeUser(user));
    navigate("/login");
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-[60px] bg-pink-600 w-full mb-2 p-2 flex shadow-2xl justify-between items-center">
      <NavLink to="/" className="text-xl text-white">
        DevMatch
      </NavLink>

      {user && (
        <div className="flex items-center gap-4 text-xl">
          <h3>{user?.firstName} {user?.lastName}</h3>

          <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <img
                className="h-8 w-8 rounded-full"
                src={user.photoUrl}
                alt="User profile picture"
              />
            </div>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <NavLink
                  to="/profile"
                  className="w-full block text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/connections"
                  className="w-full block text-left px-4 pb-4  hover:bg-gray-100 text-gray-700"
                >
                  Connections
                </NavLink>
                <NavLink
                  to="/requests"
                  className="w-full block text-left px-4 pb-4  hover:bg-gray-100 text-gray-700"
                >
                  Requests
                </NavLink>
                <hr className="mt-2" />
                <button
                  onClick={handleLogout}
                  className="w-full block text-left px-4 hover:bg-gray-100 active:bg-gray-200 active:scale-[0.98] active:transition-transform text-gray-700 border-t border-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
