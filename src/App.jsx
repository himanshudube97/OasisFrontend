import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import { Home } from "./pages/Home";

import { CreateBlog } from "./pages/CreateBlog";
import { SingleBlog } from "./pages/SingleBlog";
import { useCheckUser } from "./hooks/checkUser";
import { UserProfile } from "./pages/Profile";
import Loader from "./components/Loader/Loader";



function App() {
  const {loading, userData} = useCheckUser();
  if(loading){
    return <Loader/>
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {userData? (
            // Protected Routes
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/single-blog/:blogId" element={<SingleBlog/>} />
              <Route path="/profile" element={<UserProfile/>} />
              <Route path="/*" element={<Navigate to="/home" />} />
            </>
          ) : (
            //Public Routes
            <>
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
