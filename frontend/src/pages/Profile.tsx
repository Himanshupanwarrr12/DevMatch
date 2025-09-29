import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store: RootState) => {
    return store.user;
  });

  return <div>cooking...</div>;
};

export default Profile;
