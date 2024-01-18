import axios from "axios";
import { useAuthStore } from "../Zustand/store";

// import { jwtDecode } from "jwt-decode";
// import { useAuthStore } from "../Zustand/store";

console.log(import.meta, "ENV");
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  // withCredentials: true, //we do this as to send cookies with request and also to set the cookie in the client side. this has to be done in cors backend also.
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// api.defaults.headers.common["Authorization"] = token || null;
export const signup = (data) => api.post("/create-user", data);
export const login = (data) => api.post("/login-user", data);
export const logout = () => api.post("/logout-user");
export const getSingleUser = (id) => api.get(`/get-user/${id}`);
export const getAllUsers = () => api.get("/get-all-users");
export const updateUser = (data) => api.post("/update-user-profile", data);
export const createBlog = (data) => api.post("/create-blog", data);
export const getAllBlogs = () => api.get(`/get-all-blogs`);
export const getSingleBlog = (id) => api.get(`/get-single-blog/${id}`);
export const likeUnlikeBlog = (id, data) =>
  api.post(`/like-unlike-blog/${id}`, data);
export const createComment = (id, data) =>
  api.post(`/create-comment/${id}`, data);
export const getAllComments = (id) => api.get(`/get-comments/${id}`);
export const followUnfollowUser = (id, data) =>
  api.post(`/follow-unfollow-user/${id}`, data);
export const getAllChats = (id) => api.get(`/get-all-chats/${id}`);
export const getMyChats = () => api.get(`/get-my-chats`);

// export const joinRoom = (id)=>api.post(`/join-room/${id}`);
// export const getMessages =(id)=>api.get(`/getMessages/${id}`);

// export const getSingleRoom = (i)=>api.get(`/api/rooms/${id}`);

// Add a request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response && error.message === "Network Error") {
      console.log("cooooool");
    }
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized, handle expiration
      handleTokenExpiration();
    }
    if (error.response && error.response.status === 403) {
      //do something, when a user checks some unAuthorized  routes.
    }
    return Promise.reject(error);
  }
);

const handleTokenExpiration = () => {
  localStorage.setItem("token", "");
  useAuthStore.setState((state) => {
    console.log(state, "thorin");
    return { ...state, userData: null }; // i was directly mutating the state hence some error.
  });
};

