/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllChats } from "../http-service";
import { ChatSection } from "../components/Chat/Chat";
import { InputSection } from "../components/Chat/InputChat";
import { useAuthStore } from "../Zustand/store";

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
        console.log(data, "datatatatatata");
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
      socket.emit("join-chat-room", { roomId: chats?._id });

      socket.on("pvt-message", (msg) => {
        console.log(msg, "msg");
        setTempChats((prev) => {
          return [...prev, msg];
        });
      });

    //   return () => {
    //     console.log(chats._id, "chatsid");
    //     socket.emit("leave-room", { roomId: chats?._id });
    //     socket.off("pvt-message");
    //   };
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
