import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import CenteredLayout from "../../components/CenteredLayout";
import Navbar from "../../components/Navbar";
import PostContent from "../../components/PostContent";
import { SmallTitle } from "../../components/Title";
import { StoreState } from "../../store/store";
import Post from "../../types/posts";

enum PostState {
  Loading,
  Loaded,
}

export default function PostRoute() {
  const router = useRouter();
  const { id } = router.query;

  const { state, post } = useSelector((state: StoreState) => {
    if (!state.posts) {
      return {
        state: PostState.Loading,
        post: null,
      };
    } else {
      return {
        state: PostState.Loaded,
        post: state.posts?.find((post) => post.id === Number(id)),
      };
    }
  });

  // Post is not found
  if (state == PostState.Loaded && !post) {
    return <p>not found</p>;
  }

  // Post is loading...
  if (state == PostState.Loading && !post) {
    return <p>Loading..</p>;
  }

  return (
    <CenteredLayout>
      <main>
        <PostContent>
          <Navbar />
          <SmallTitle>{post?.title}</SmallTitle>
          <p>{post?.body}</p>
        </PostContent>
      </main>
    </CenteredLayout>
  );
}
