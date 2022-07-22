import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PropsWithChildren, useEffect } from "react";
import fetchPosts from "../services/fetchPosts";
import { Provider, useDispatch } from "react-redux";
import store, { loadPosts } from "../store/store";

function PostsProvider({ children }: PropsWithChildren) {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPosts().then((posts) => {
      dispatch(loadPosts(posts));
    });

    // https://github.com/facebook/react/issues/17156
    /*eslint-disable react-hooks/exhaustive-deps*/ 
  }, []); 

  return <>{children}</>;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PostsProvider>
        <Component {...pageProps} />
      </PostsProvider>
    </Provider>
  );
}

export default App;
