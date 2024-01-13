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
import { OtherUserProfile } from "./pages/OthersProfile";
import ChatPage from "./pages/ChatPage";
import { useEffect, useState } from "react";
import { socketConnectFunction } from "./socketConnection";

let socket;
function App() {
  const { loading,chats, userData } = useCheckUser();
  // eslint-disable-next-line no-unused-vars
  const [isSocketCon, setSocketCon]  = useState(false);
  useEffect(() => {
    if (userData && chats) {
      socket = socketConnectFunction();
      socket.auth = {userData, chats};
      socket.connect();
      socket.on("connection", ({socketId}) => {
        console.log(socketId, "con");
        setSocketCon(true);
      });
      return () => {
        socket.disconnect("disconnect");
      };
    }
  }, [userData, chats]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <BrowserRouter>
        <Navbar socket={socket} />
        <Routes>
          {userData ? (
            // Protected Routes
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/single-blog/:blogId" element={<SingleBlog />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route
                path="/user-profile/:userId"
                element={<OtherUserProfile />}
              />
              <Route path="/single-chat/:userId/:userName" element={<ChatPage socket={socket} />} />
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
