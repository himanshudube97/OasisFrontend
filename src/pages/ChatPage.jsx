/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllChats } from "../http-service";
import { ChatSection } from "../components/Chat/Chat";
import { InputSection } from "../components/Chat/InputChat";
import { useAuthStore } from "../Zustand/store";
import Loader from "../components/Loader/Loader";

export default function ChatPage({ socket }) {
  const { userId, userName } = useParams();
  const { userData } = useAuthStore((state) => {
    return { ...state };
  });
  const [chats, setChats] = useState(null); //chat._id is what we need for socket connection.
  const [tempChats, setTempChats] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  /**
   * UseEffect to fetch chats from db.
   */
  useEffect(() => {
    async function getChats() {
      try {
        const { data } = await getAllChats(userId);
        // console.log(data, "datatatatatata");
        setChats(data.data); // data.data.messages.
        setTempChats(data.data.messages);
      } catch (error) {
        console.log(error, "errrroor");
      }
    }
    getChats();
  }, [userId]);



  //useEffect to listen a chat event

  useEffect(() => {
    if (chats) {
        //making this function seperate 
        //so that to pass the same refernce to cleanup function too.
      const handlePrivateMessage = (msg) => {
        console.log("byyyyyyyyyyyyyyyyeeeeeeee");
        setTempChats((prev) => [...prev, msg]);
      };
  
      // Add event listener only once
      socket.on("pvt-message", handlePrivateMessage);
  
      // Cleanup function to remove the listner when this unmounts, especially in dev mode.
      return () => {
        socket.off("pvt-message", handlePrivateMessage);
      };
    }
  }, [socket, chats]);
  
  const handleInputChange = (e) => {
    setInputMsg(e.target.value);
  };

  const handleSubmit = () => {
    socket.emit("pvt-message", {
      chatId: chats._id,
      message: inputMsg,
      fromName: userData.name,
      toName: userName,
      fromId: userData._id,
      toId: userId,
      toSocketId: ""
    });
    setInputMsg("");
  };
if(!chats){
    return <Loader />
}
  return (
    <>
      {/* Chat component */}
      <ChatSection tempChats={tempChats} chatId={chats?._id} />
      {/* Input componet */}
      <InputSection
        handleInputChange={handleInputChange}
        inputMsg={inputMsg}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
