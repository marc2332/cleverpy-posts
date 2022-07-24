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
    removePost(state, action: { type: string; payload: number }) {
      if (state.posts) {
        state.posts = state.posts?.filter((post) => post.id !== action.payload);
      }
    },
    setPost(state, action: { type: string; payload: Post }) {
      state.posts?.forEach((post) => {
        if (post.id === action.payload.id) {
          post.body = action.payload.body;
          post.title = action.payload.title;
        }
      });
    },
  },
});

export interface ConfigState {
  theme: Themes;
  userId: string | null;
  editMode: boolean;
}

const configSlice = createSlice({
  name: "config",
  initialState: {
    theme: Themes.Dark,
    userId: null,
    editMode: false,
  } as ConfigState,
  reducers: {
    toggleTheme(state) {
      if (state.theme == Themes.Dark) {
        state.theme = Themes.Light;
      } else {
        state.theme = Themes.Dark;
      }
    },
    setEditMode(state, { payload }: { type: string; payload: boolean }) {
      state.editMode = payload;
    },
    setUserId(state, { payload }: { type: string; payload: string | null }) {
      state.userId = payload;
    },
  },
});

const persistedReducer = persistReducer(
  {
    key: "config",
    storage,
  },
  configSlice.reducer
);

const reducer = combineReducers({
  posts: postsSlice.reducer,
  config: persistedReducer,
});

export interface StoreState {
  posts: PostsState;
  config: ConfigState;
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
export const { loadPosts, removePost, setPost } = postsSlice.actions;
export const { toggleTheme, setEditMode, setUserId } = configSlice.actions;
