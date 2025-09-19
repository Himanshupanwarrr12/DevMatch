import { baseUrl } from "@/utils/constant";
import { useState } from "react";
import axios , {AxiosError}  from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        baseUrl + "/signUp",
        {
          firstName,
          lastName, 
          email,
          password,
          gender,
        },
        { withCredentials: true }
      );
      console.log("res : ", res);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          setError(`Server error: ${axiosError.response.status}`);
          console.log("Server Error:", axiosError.response.data);
        } else {
          setError("Network error");
          console.log("Network Error:", axiosError.message);
        }
      } else {
        setError("SignUp failed");
        console.log("Unknown Error:", error);
      }
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center mb-6 bg-stone-300">
      <div className="  h-full w-[700px] bg-stone-400">
        <h1 className="text-4xl text-center mt-2 text-black font-serif">
          SignUp Page
        </h1>
        <h3 className="text-xl text-center mt-0.5 text-orange-950 ">
          Create Your Devloper Profile!
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="m-2 p-3 flex gap-6">
            <div className="flex flex-col w-full">
              <label htmlFor="firstName" className="text-xl mb-2">
                Firstname:
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your Firstname"
                className="border border-black bg-stone-200 p-2 w-[300px]"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-xl mb-2">
                Lastname:
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your Lastname"
                className="border border-black bg-stone-200 p-2 w-[300px]"
              />
            </div>
          </div>

          <div className=" m-2 p-3 flex flex-col ">
            <label htmlFor="email" className="text-xl mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className=" border border-black bg-stone-200 p-2 "
            />
          </div>
          <div className=" m-2 p-3 flex flex-col ">
            <label htmlFor="password" className="text-xl mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="border border-black bg-stone-200 p-2 "
            />
          </div>
          <fieldset className=" m-2 p-3 flex flex-col ">
            <legend className="text-xl mb-2">Gender:</legend>
            <div>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                className="mb-2 text-2xl"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male" className="text-xl">
                male
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                className=""
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female" className="text-xl">
                female
              </label>
            </div>
          </fieldset>
          <div className="flex justify-center ">
            <button
              className="text-black bg-gray-500 hover:bg-gray-600 rounded-3xl text-xl px-3 py-2 "
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
