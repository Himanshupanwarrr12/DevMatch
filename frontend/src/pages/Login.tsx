import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "@/features/user/userSlice";
import axiosInstance from "@/utils/axios.config";

const Login = () => {
  const [emailId, setEmailId] = useState("speed12@gmail.com");
  const [password, setPassword] = useState("Speedwar@12");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setError("")
      const userData = await axiosInstance.post("/login",{emailId,password})
      console.log("UserData : ",userData)
      console.log("UserData.data : ",userData.data)

      dispatch(addUser(userData.data))
      navigate("/")
    } catch (error:any) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      console.log("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex  justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white h-full mt-12 border-1 border-black p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="mb-5">
          <h1 className="text-2xl  text-rose-500 text-center">
            Connect with devlopers like you!
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="mb-5">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-rose1-500 focus:border-rose-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-600 text-lg  mb-4 text-center">{error}</p>
          )}
          <div className="mt-5 p-2">
            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
