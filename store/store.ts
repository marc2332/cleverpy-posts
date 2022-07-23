import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import Post from "../types/posts";

export enum Themes {
  Light,
  Dark,
}

export interface PostsState {
  posts: Post[] | null;
}

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
  } as PostsState,
  reducers: {
    loadPosts(state, action: { type: string; payload: Post[] }) {
      state.posts = action.payload;
    },
  },
});

export interface ThemeState {
  theme: Themes;
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: Themes.Light,
  } as ThemeState,
  reducers: {
    toggleTheme(state) {
      if (state.theme == Themes.Dark) {
        state.theme = Themes.Light;
      } else {
        state.theme = Themes.Dark;
      }
    },
  },
});

const persistedReducer = persistReducer(
  {
    key: "config",
    storage,
  },
  themeSlice.reducer
);

const reducer = combineReducers({
  posts: postsSlice.reducer,
  theme: persistedReducer,
});

export interface StoreState {
  posts: PostsState;
  theme: ThemeState;
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const { loadPosts } = postsSlice.actions;
export const { toggleTheme } = themeSlice.actions;
