import { create } from "zustand";
import {
  createBlog,
  createComment,
  followUnfollowUser,
  getAllBlogs,
  getAllComments,
  getAllUsers,
  getMyChats,
  getSingleBlog,
  getSingleUser,
  likeUnlikeBlog,
  login,
  logout,
  signup,
  updateUser,
} from "../http-service";

/**
 * MAKING GLOBAL LOADING STATES IS PROBLEMETIC IN SOME CASES,
 * LIKE, I WANTED TO MAKE A LIKE UNLIKE BUTTON
 * AND THE WHOLE COMPONENT WAS BEING RENDERED,
 * BECAUSE IT WAS CHANGING THE STATE.
 */
export const useAuthStore = create((set) => ({
  userData: null,
  users: [],
  singleUser: null,
  isUpdating: true,

  setUserData: (data) => set((state) => ({ ...state, ...data })),

  createUser: async function (user) {
    try {
      await signup(user);
      return { error: null, data: "Success" };
    } catch (error) {
      console.log(error, "errodube");
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },

  loginUser: async function (phone) {
    try {
      const { data } = await login(phone);
      console.log(data.data, "data");
      localStorage.setItem("token", data.data.token);
      set({ userData: data.data.user });
      return { error: null, data: "Successfully fetched" };
    } catch (error) {
      console.log(error, "error");
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },
  logoutUser: async function () {
    try {
      await logout();
      localStorage.setItem("token", "");
      set({ userData: null });
      return { error: null, data: "Successfully Logged Out" };
    } catch (error) {
      console.log(error, "error");
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },

  getSingleUser: async function (userId) {
    try {
      const { data } = await getSingleUser(userId);
      set({ userData: data.data });
      return { error: null, data: "Successfully fetched User" };
    } catch (error) {
      console.log(error, "error");
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },
  getSingleUserOther: async function (userId) {
    try {
      const { data } = await getSingleUser(userId);
      set({ singleUser: data.data });
      return { error: null, data: "Successfully fetched User" };
    } catch (error) {
      console.log(error, "error");
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },

  getAllUsers: async function () {
    try {
      const { data } = await getAllUsers();
      set({ users: data.data });
      return { error: null, data: "Successfully fetched Users" };
    } catch (error) {
      console.log(error, "error");
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },

  updateUser: async function (updateData) {
    try {
      set({ isUpdating: true });
      const { data } = await updateUser(updateData);
      set({ userData: data.data, isUpdating: false });
      return { error: null, data: "Successfully Updated User" };
    } catch (error) {
      console.log(error, "error");
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },
  followUnfollow: async function (id, newData) {
    try {
      const { data } = await followUnfollowUser(id, newData);
      set({ userData: data.data });
    } catch (error) {
      console.log(error, "error");
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },
}));

export const useBlogsStore = create((set) => ({
  allBlogs: [],
  allComments: [],
  totalBlogs: 0,
  singleBlog: null,
  selectedWord: "",

  createBlog: async function (blogData) {
    try {
      await createBlog(blogData);
      return { error: null, data: "Successfully Created Blog" };
    } catch (error) {
      console.log(error, "error");
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },

  getAllBlogs: async function () {
    try {
      const { data } = await getAllBlogs();
      console.log(data, "all Blogs");
      set(() => {
        return {
          allBlogs: [...data.data.blogs],
          totalBlogs: data.data.blogCount,
        };
      });
      return { error: null, data: "Successfully fetched All Blogs" };
    } catch (error) {
      console.log(error, "error");
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },

  getSingleBlog: async function (blogId) {
    try {
      const { data } = await getSingleBlog(blogId);
      console.log(data, "singel eblog");
      set({ singleBlog: data.data });
      return { error: null, data: "Successfully fetched Blog" };
    } catch (error) {
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },

  likeUnlikeBlog: async function (blogId, likeBlog) {
    try {
      await likeUnlikeBlog(blogId, likeBlog);
      return { error: null, data: "Success" };
    } catch (error) {
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },

  createComment: async function (blogId, data) {
    try {
      await createComment(blogId, data);
      set((state) => {
        return {
          allComments: [...state.allComments, data],
        };
      });
      return { error: null, data: "Success" };
    } catch (error) {
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },

  getAllComments: async function (blogId) {
    try {
      const { data } = await getAllComments(blogId);
      console.log(data, "datacommnets");
      set(() => {
        return {
          allComments: data.data,
          loading: false,
        };
      });
      return { error: null, data: "Successfully fetched All Comments" };
    } catch (error) {
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },

  selectWord: function (word) {
    set({ selectedWord: word });
  },
  clearWord: function () {
    set({ selectedWord: "" });
  },
}));

//msg chat store

export const useChatStore = create((set) => ({
  chats: null,

  getChats: async function (userId) {
    try {
      const { data } = await getMyChats(userId);
      console.log(data, "chats");
      set(() => {
        return {
          chats: data.data,
        };
      });
      return { error: null, data: "Successfully fetched All Comments" };
    } catch (error) {
      if (!error.response && error.message === "Network Error") {
        return { error: error.message, data: null };
      }
      if (error.response && error.response.data.message) {
        return { error: error.response.data.message };
      }
    }
  },
}));

//error.response.status = 401
