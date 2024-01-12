import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllChats } from "../http-service";

export default function ChatPage() {
  const { userId } = useParams();
  const [chats, setChats] = useState([]); //chat._id is what we need for socket connection.
  useEffect(() => {
    async function getChats() {
      try {
        const { data } = await getAllChats(userId);
        console.log(data, "datatatatatata");
        setChats(data.data); // data.data.messages.
      } catch (error) {
        console.log(error, "errrroor");
      }
    }
    getChats();
  }, [userId]);

  return (
    <>
      {/* Chat component */}
      hi
      {/* Input componet */}
    </>
  );
}
