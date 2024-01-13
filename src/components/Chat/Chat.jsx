/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef, } from "react";
import { SingleMsg } from "./SingleMessage";

// eslint-disable-next-line no-unused-vars
export const ChatSection = ({ chatId, tempChats }) => {
  // const [allMsgs, setAllMsgs] = useState([]);
  const messageContainerRef = useRef(tempChats);

  useEffect(() => {
    // Scroll to the bottom of the message container when messages change or component mounts
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [tempChats]);
  //if all msgs change then only this map function will run.
  // storing SingleMsg as memo, because, while rendering only those msgs will re render which are new not the old ones.
  return (
    <>
      <div
        ref={messageContainerRef}
        className="flex-grow bg-gray-100 max-w-[50%] max-h-[55vh]  px-4 py-6 mx-auto overflow-y-auto"
      >
        {/* Your chat messages here */}

        {/* {MappedChats} */}
        {tempChats?.map((item, i) => {
            if(item.chatId == chatId)
          return (
            <Fragment  key ={i}>
              {/* {item.message} */}
              <SingleMsg item={item} />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};
