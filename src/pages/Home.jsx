
import { useAuthStore,  } from "../Zustand/store";
import { HomeHeader } from "../components/HomePage/HomeHeader";
import { DisplayCards } from "../components/HomePage/DisplayCards";
import Loader from "../components/Loader/Loader";

export const Home = () => {
  const { userData , loading } = useAuthStore((state) => {
    return { ...state };
  });

  if(loading){
    return <Loader/>
  }
  return (
    <>
      <div className="py-8 px-4">
        {" "}
        {/* Adjust padding and margin as needed */}
        <HomeHeader userName={userData?.name} />
        <DisplayCards />
      </div>
    </>
  );
};
