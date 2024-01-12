import { useEffect, useState } from "react";
import { useAuthStore } from "../Zustand/store";
import { jwtDecode } from "jwt-decode";

export const useCheckUser = () => {
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    // eslint-disable-next-line no-unused-vars
    const { userData, getSingleUser } = useAuthStore((state) => {
        return { ...state };
    });

    useEffect(() => {
        async function getUserInfo(userId){
            setLoading(true);
              await getSingleUser(userId)
            setLoading(false);
        }
        if (token) {
            const decoded = jwtDecode(token);
             getUserInfo(decoded.id);
        }else{
            getUserInfo("");
        }
    }, [token, getSingleUser])

    
    return {loading,userData}
}