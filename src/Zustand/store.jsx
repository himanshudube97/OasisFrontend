import { create } from "zustand";
import {
  createBlog,
  createComment,
  getAllBlogs,
  getAllComments,
  getSingleBlog,
  getSingleUser,
  likeUnlikeBlog,
  login,
  logout,
  signup,
} from "../http-service";


/**
 * MAKING GLOBAL LOADING STATES IS PROBLEMETIC IN SOME CASES,
 * LIKE, I WANTED TO MAKE A LIKE UNLIKE BUTTON
 * AND THE WHOLE COMPONENT WAS BEING RENDERED,
 * BECAUSE IT WAS CHANGING THE STATE.
 */
export const useAuthStore = create((set) => ({
  userData: null,
  loading: false,
  signUpError: null,
  signInError: null,

  setUserData: (data) => set((state) => ({ ...state, ...data })),

  createUser: async function (user) {
    set({ loading: true });
    try {
      await signup(user);
      set({ loading: false });
    } catch (error) {
      console.log(error?.reponse.data, "errodube");
      if (error.response && error?.response?.data?.message) {
        set({ loading: false });
        return error.reponse.data.message;
      } else if (error.request && error.name == "AxiosError") {
        set({ loading: false, signUpError: error.message });
        return error.message;
      }
    }
  },

  loginUser: async function (phone) {
    set({ loading: true });
    try {
      const { data } = await login(phone);
      console.log(data.data, "data");
      localStorage.setItem("token", data.data.token);
      set({ loading: false, userData: data.data.user });
    } catch (error) {
      console.log(error, "error");
      if (error.request && error.name == "AxiosError") {
        set({ loading: false, signUpError: error.message });
        return error.message;
      } else if (error.response) {
        set({ loading: false });
      }
    }
  },
  logoutUser: async function () {
    set({ loading: true });
    try {
      await logout();
      localStorage.setItem("token", "");
      set({ loading: false, userData: null });
    } catch (error) {
      console.log(error, "error");
      if (error.request && error.name == "AxiosError") {
        set({ loading: false, signUpError: error.message });
        return error.message;
      } else if (error.response) {
        set({ loading: false });
      }
    }
  },

  getSingleUser: async function (userId) {
    set({ loading: true });
    try {
      const { data } = await getSingleUser(userId);
      console.log(data, "getsingle");
      set({ loading: false, userData: data.data });
    } catch (error) {
      console.log(error, "error");
      if (error.request && error.name == "AxiosError") {
        set({ loading: false, signUpError: error.message });
        return error.message;
      } else if (error.response) {
        set({ loading: false });
      }
    }
  },
}));

export const useBlogsStore = create((set) => ({
  allBlogs: [],
  allComments: [],
  totalBlogs: 0,
  singleBlog: null,
  loading: false,

  createBlog: async function (blogData) {
    set({ loading: true });
    try {
      await createBlog(blogData);
      set({ loading: false });
      // set((state) => { return { allBlogs: [...state.allBlogs, data.result], loading: false } })
    } catch (error) {
      console.log(error, "error");
      if (error.request && error.name == "AxiosError") {
        set({ loading: false, signUpError: error.message });
        return error.message;
      } else if (error.response) {
        set({ loading: false });
      }
    }
  },

  getAllBlogs: async function () {
    set({ loading: true });
    try {
      const { data } = await getAllBlogs();
      console.log(data, "all roooms");
      set(() => {
        return {
          allBlogs: [...data.data.blogs],
          loading: false,
          totalBlogs: data.data.blogCount,
        };
      });
    } catch (error) {
      console.log(error, "error");
      if(error.response && error.response.status === 401){
        alert("unauth")
      }
      else if (error.request && error.name == "AxiosError") {
        set({ loading: false, signUpError: error.message });
        return error.message;
      } else if (error.response) {
        set({ loading: false });
      }
    }
  },

  getSingleBlog: async function (blogId) {
    set({ loading: true });
    try {
      const { data } = await getSingleBlog(blogId);
      console.log(data, "singleroom");
      set({ singleBlog: data.data, loading: false });
    } catch (error) {
      if (error.request && error.name == "AxiosError") {
        set({ loading: false, signUpError: error.message });
        return error.message;
      } else if (error.response) {
        set({ loading: false });
      }
    }
  },

  likeUnlikeBlog: async function (blogId, likeBlog) {
    // set({ loading: true });
    try {
      await likeUnlikeBlog(blogId, likeBlog);
      // set({ loading: false });
    } catch (error) {
      if (error.request && error.name == "AxiosError") {
        set({ loading: false, signUpError: error.message });
        return error.message;
      } else if (error.response) {
        set({ loading: false });
      }
    }
  },

  createComment: async function (blogId, data) {
    try {
      await createComment(blogId, data);
      set((state)=>{
        console.log(state, "stetatatata")
        return {
          allComments: [...state.allComments,data]
        }
      })
    } catch (error) {
      if (error.request && error.name == "AxiosError") {
        set({ loading: false, signUpError: error.message });
        return error.message;
      } else if (error.response) {
        set({ loading: false });
      }
    }
  },

  getAllComments: async function (blogId) {
    set({ loading: true });
    try {
      const { data } = await getAllComments(blogId);
      console.log(data, "datacommnets");
      set(() => {
        return {
          allComments: data.data,
          loading: false,
        };
      });
    } catch (error) {
      if (error.request && error.name == "AxiosError") {
        set({ loading: false, signUpError: error.message });
        return error.message;
      } else if (error.response) {
        set({ loading: false });
      }
    }
  },
}));

//error.response.status = 401
