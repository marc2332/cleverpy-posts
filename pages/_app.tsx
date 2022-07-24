import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PropsWithChildren, useEffect } from "react";
import fetchPosts from "../services/fetchPosts";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { loadPosts, setEditMode, StoreState, Themes } from "../store/store";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import LightTheme from "../themes/light";
import DarkTheme from "../themes/dark";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SkeletonTheme } from "react-loading-skeleton";

const persistor = persistStore(store);

function getTheme(theme: Themes): typeof LightTheme | typeof DarkTheme {
  switch (theme) {
    case Themes.Dark:
      return DarkTheme;
    default:
      return LightTheme;
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
  }
`;

function PostsProvider({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const config = useSelector((state: StoreState) => state.config);
  const selectedTheme = getTheme(config.theme);

  useEffect(() => {
    // Disable the Edit Mode when the user logs out
    if(!config.userId) {
      dispatch(setEditMode(false))
    }
  },[config.userId])

  useEffect(() => {
    fetchPosts().then((posts) => {
      setTimeout(() => {
        dispatch(loadPosts(posts));
      }, 250) // Simulated latency
    });

    // https://github.com/facebook/react/issues/17156
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, []);

  return (
    <SkeletonTheme
      baseColor={selectedTheme.skeleton.baseColor}
      highlightColor={selectedTheme.skeleton.highlightColor}
    >
      <ThemeProvider theme={selectedTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </SkeletonTheme>
  );
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PostsProvider>
          <Component {...pageProps} />
        </PostsProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
