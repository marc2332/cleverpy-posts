import React from "react";
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
import { removePost, StoreState, unmarkPostAsLiked } from "../store/store";
import FilledStar from "../components/FilledStar";
import Link from "next/link";
import Head from 'next/head'

function ErrorMessage() {
  return (
    <>
      <Message>
        <div>
          <MessageText>No posts liked</MessageText>
          <Link href="/">
            <Button expanded={true}>Go Home</Button>
          </Link>
        </div>
      </Message>
    </>
  );
}

export default function LikedPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state: StoreState) => {
    if (!state.posts.posts) return null;
    return state.posts.posts?.filter((post) =>
      state.config.likedPosts.hasOwnProperty(post.id)
    );
  });
  const isEditMode = useSelector((state: StoreState) => state.config.editMode);

  function scrollToTop() {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  function unlikePost(postId: number) {
    dispatch(unmarkPostAsLiked(postId));
  }

  return (
    <CenteredLayout>
       <Head>
        <title>Liked Posts</title>
        <meta property="og:title" content="Liked Posts" key="title" />
      </Head>
      <main>
        <Navbar />
        <PostsList>
          {posts ? (
            posts.length > 0 ? (
              posts.map((post) => {
                function unlikeOnClick(e: React.MouseEvent) {
                  unlikePost(post.id);
                  e.preventDefault();
                }

                return (
                  <PostCard
                    key={post.id}
                    {...post}
                    floatingButton={
                      isEditMode ? (
                        <div>
                          <CardFloatingButton
                            expanded={false}
                            onClick={unlikeOnClick}
                          >
                            <FilledStar />
                          </CardFloatingButton>
                        </div>
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
        {posts && posts.length > 7 && (
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
