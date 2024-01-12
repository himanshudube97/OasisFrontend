import { memo, useEffect, useMemo, useRef, useState } from "react";




export const ChatSection = (( ) => {

    const [allMsgs, setAllMsgs] = useState([]);
    const messageContainerRef = useRef(null);



    useEffect(() => {
        // Scroll to the bottom of the message container when messages change or component mounts
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [allMsgs]);



  

    //if all msgs change then only this map function will run.
    // storing SingleMsg as memo, because, while rendering only those msgs will re render which are new not the old ones.
    return <>
        <div>
            <div ref={messageContainerRef} className="flex-grow bg-gray-100 max-w-[50%] max-h-[55vh]  px-4 py-6 mx-auto overflow-y-auto">
                {/* Your chat messages here */}

                {/* {MappedChats} */}
                hi

            </div>
        </div>

    </>
});