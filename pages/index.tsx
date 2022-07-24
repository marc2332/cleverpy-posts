import React from "react";
import { Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import CenteredLayout from "../components/CenteredLayout";
import BottomBar from "../components/BottomBar";
import Message, { MessageText } from "../components/Message";
import Navbar from "../components/Navbar";
import PostCard, {
  CardFloatingButton,
  PostCardWithShimmer,
} from "../components/PostCard";
import PostsList from "../components/PostsList";
import fetchPosts from "../services/fetchPosts";
import { loadPosts, removePost, StoreState } from "../store/store";

function ErrorMessage() {
  const dispatch = useDispatch();

  function tryAgain() {
    fetchPosts().then((posts) => {
      dispatch(loadPosts(posts));
    });
  }

  return (
    <>
      <Message>
        <div>
          <MessageText>No posts found</MessageText>
          <Button onClick={tryAgain} expanded={true}>
            Try again
          </Button>
        </div>
      </Message>
    </>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state: StoreState) => state.posts.posts);
  const isEditMode = useSelector((state: StoreState) => state.config.editMode);

  function scrollToTop() {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  function removePostById(postId: number) {
    dispatch(removePost(postId));
  }

  return (
    <CenteredLayout>
      <main>
        <Navbar />
        <PostsList>
          {posts ? (
            posts.length > 0 ? (
              posts.map((post) => {
                function onClick(e: React.MouseEvent) {
                  removePostById(post.id);
                  e.preventDefault();
                }

                return (
                  <PostCard
                    key={post.id}
                    {...post}
                    floatingButton={
                      isEditMode ? (
                        <CardFloatingButton expanded={false} onClick={onClick}>
                          <Trash />
                        </CardFloatingButton>
                      ) : null
                    }
                  />
                );
              })
            ) : (
              <ErrorMessage />
            )
          ) : (
            new Array(7).fill(0).map((_, i) => <PostCardWithShimmer key={i} />)
          )}
        </PostsList>
        {posts && posts.length > 0 && (
          <BottomBar>
            <Button expanded={false} onClick={scrollToTop}>
              Scroll to top
            </Button>
          </BottomBar>
        )}
      </main>
    </CenteredLayout>
  );
}
