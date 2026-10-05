import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Instagram Product Launch",
      platform: "Instagram",
      start: new Date(2026, 8, 11, 10, 0),
      end: new Date(2026, 8, 11, 11, 0),
    },
    {
      id: 2,
      title: "Facebook Marketing Post",
      platform: "Facebook",
      start: new Date(2026, 8, 12, 14, 0),
      end: new Date(2026, 8, 12, 15, 0),
    },
    {
      id: 3,
      title: "LinkedIn Career Tips",
      platform: "LinkedIn",
      start: new Date(2026, 8, 13, 16, 0),
      end: new Date(2026, 8, 13, 17, 0),
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        ...action.payload,
        id: Date.now(),
      });
    },

    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },

    movePost: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload.id
      );

      if (post) {
        post.start = action.payload.start;
        post.end = action.payload.end;
      }
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const {
  addPost,
  updatePost,
  movePost,
  deletePost,
} = postsSlice.actions;

export default postsSlice.reducer;