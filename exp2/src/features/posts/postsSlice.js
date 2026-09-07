import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Welcome Post",
      content: "This is my first post.",
      platform: "Instagram",
      status: "published",
    },
    {
      id: 2,
      title: "College Update",
      content: "Learning Redux Toolkit.",
      platform: "Facebook",
      status: "published",
    },
    {
      id: 3,
      title: "Future Project",
      content: "Planning my next project.",
      platform: "LinkedIn",
      status: "draft",
    },
    {
      id: 4,
      title: "Tech Post",
      content: "Exploring React performance.",
      platform: "Instagram",
      status: "published",
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
  },
});

export const {
  addPost,
  deletePost,
  updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;