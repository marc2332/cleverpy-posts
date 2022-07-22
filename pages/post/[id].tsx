import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CenteredLayout from "../../components/CenteredLayout";
import Navbar from "../../components/Navbar";
import { SmallTitle } from "../../components/Title";
import { StoreState } from "../../store/store";

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

  let content = (
    <>
      <SmallTitle>{post?.title}</SmallTitle>
      <i>By {post?.userId}</i>
      <p>{post?.body}</p>
    </>
  );

  // Post is not found
  if (state == PostState.Loaded && !post) {
    content = <p>not found</p>;
  }

  // Post is loading...
  if (state == PostState.Loading && !post) {
    content = <p>Loading..</p>;
  }

  return (
    <CenteredLayout>
      <main>
        <Navbar />
        {content}
      </main>
    </CenteredLayout>
  );
}
