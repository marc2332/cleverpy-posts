import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import CenteredLayout from "../components/CenteredLayout";
import Footer from "../components/Footer";
import Message, { MessageText } from "../components/Message";
import Navbar from "../components/Navbar";
import PostCard, { PostCardWithShimmer } from "../components/PostCard";
import PostsList from "../components/PostsList";
import fetchPosts from "../services/fetchPosts";
import { loadPosts, StoreState } from "../store/store";

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
  const posts = useSelector((state: StoreState) => state.posts.posts);

  function scrollToTop() {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  return (
    <CenteredLayout>
      <main>
        <Navbar />
        <PostsList>
          {posts ? (
            posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} {...post} />)
            ) : (
              <ErrorMessage />
            )
          ) : (
            new Array(7).fill(0).map((_, i) => <PostCardWithShimmer key={i} />)
          )}
        </PostsList>
        {posts && posts.length > 0 && (
          <Footer>
            <Button expanded={false} onClick={scrollToTop}>
              Scroll to top
            </Button>
          </Footer>
        )}
      </main>
    </CenteredLayout>
  );
}
