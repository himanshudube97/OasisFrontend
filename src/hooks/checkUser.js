import { useEffect, useState } from "react";
import { useAuthStore, useChatStore } from "../Zustand/store";
import { jwtDecode } from "jwt-decode";

export const useCheckUser = () => {
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    // eslint-disable-next-line no-unused-vars
    const { userData, getSingleUser } = useAuthStore((state) => {
        return { ...state };
    });
    const { chats, getChats } = useChatStore((state) => {
        return { ...state };
    });

    useEffect(() => {
        async function getUserInfo(userId) {
            setLoading(true);
            await getSingleUser(userId)
            await getChats(userId);
            setLoading(false);
        }
        if (token) {
            const decoded = jwtDecode(token);
            getUserInfo(decoded.id);
        }
    }, [token, getSingleUser, getChats])

    if (!token) {
        return { loading: false, userData, chats }
    }

    return { loading, userData, chats }
}