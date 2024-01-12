import { useAuthStore } from "../Zustand/store";
import { HomeHeader } from "../components/HomePage/HomeHeader";
import { DisplayCards } from "../components/HomePage/DisplayCards";
import Loader from "../components/Loader/Loader";
import { AllUsers } from "../components/HomePage/AllUsers";
import { UserFollowersList } from "../constants/constants";

export const Home = () => {
  const { userData, loading } = useAuthStore((state) => {
    return { ...state };
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="py-8 px-4">
        {" "}
        {/* Adjust padding and margin as needed */}
        <HomeHeader userName={userData?.name} />
        <div className="flex gap-10 px-10 ">
          <div></div>
          <DisplayCards />

          <AllUsers whatToShow={UserFollowersList.NOT_FOLLOWED} />
        </div>
      </div>
    </>
  );
};
