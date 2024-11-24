import { create } from "zustand";
import { api } from "../lib/axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  allUsers: [],
  isSigningUp: false,
  isLoggingIn: false,
  isLoading: false,
  isUpdatingProfile: false,
  posts: [],
  isPost: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("/auth/signup", data);
      set({ authUser: res.data });

      //toast.success("Account created successfully");
    } catch (error) {
      console.log(error);
      //toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data });
      //  toast.success("Logged in successfully");
    } catch (error) {
      console.log(error);
      //toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
      //toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      //toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await api.patch(`/auth/update-profile`, data);
      const updatedUser = { ...get().authUser, ...res.data };
      set({ authUser: updatedUser });
    } catch (error) {
      console.error("Update Profile Error:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Handle post separately
  createPost: async (data) => {
    
    set({ isPost: true });
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);

      if (data.images) {
        data.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const res = await api.post(`/createpost`, formData);

      // Add the created post to the posts array in the store
      set((state) => ({
        posts: [...state.posts, res.data], // Add the new post to the posts state
      }));
    } catch (error) {
      console.error("Create Post Error:", error);
    } finally {
      set({ isPost: false });
    }
  },
 
  getAllusers: async () => {
    set({isLoading : true})
    try {
      const res = await api.get("/auth/getallusers"); 
      set({ allUsers: res.data });
     
    } catch (error) {
        set({isLoading : false})
      console.error("Error fetching posts:", error);
    }finally{
        set({isLoading : false})
    }
  },
  getProfile: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/auth/getProfile");
      set({ authUser: response.data });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      set({ isLoading: false });
    }
  },


  //   getOtheruser: async (otheruserId) => {
  //     try {
  //       const res = await api.get("/getaalusers");  
  //       set({ posts: res.data });
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   },
  // Fetch posts for the user

  getPosts: async () => {
    try {
      const res = await api.get("/posts"); 
      set({ posts: res.data });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },
}));
