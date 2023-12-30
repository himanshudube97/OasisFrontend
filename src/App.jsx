import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import { Home } from "./pages/Home";
import { useAuthStore } from "./Zustand/store";
import { CreateBlog } from "./pages/CreateBlog";
import { SingleBlog } from "./pages/SingleBlog";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
function App() {
  const token = localStorage.getItem("token");

  // eslint-disable-next-line no-unused-vars
  const { userData, loading, getSingleUser } = useAuthStore((state) => {
    return { ...state };
  });

  useEffect(()=>{
    if(token){
      const decoded = jwtDecode(token);
      getSingleUser(decoded.id);
    }
  },[token,getSingleUser])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {token? (
            // Protected Routes
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/single-blog/:blogId" element={<SingleBlog/>} />
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
