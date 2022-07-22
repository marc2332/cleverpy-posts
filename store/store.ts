import { configureStore, createSlice } from "@reduxjs/toolkit";
import Post from "../types/posts";

export interface StoreState {
  posts: Post[] | null;
}

const postsSlice = createSlice({
  name: "counter",
  initialState: {
    posts: null,
  } as StoreState,
  reducers: {
    loadPosts(state, action: { type: string; payload: Post[] }) {
      state.posts = action.payload;
    },
  },
});

const store = configureStore({
  reducer: postsSlice.reducer,
});

export default store;
export const { loadPosts } = postsSlice.actions;
