import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Bookmark, Star } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import CenteredLayout from "../../components/CenteredLayout";
import EditArea from "../../components/EditArea";
import FilledStar from "../../components/FilledStar";
import Label from "../../components/Label";
import Message, { MessageText } from "../../components/Message";
import Navbar from "../../components/Navbar";
import PostContent from "../../components/PostContent";
import Sidebar, { SidebarButton } from "../../components/Sidebar";
import { SmallTitle } from "../../components/Title";
import {
  markPostAsLiked,
  setPost,
  StoreState,
  unmarkPostAsLiked,
} from "../../store/store";
import Post from "../../types/posts";

enum PostState {
  Loading,
  Loaded,
}

export default function PostRoute() {
  const likedPosts = useSelector(
    (state: StoreState) => state.config.likedPosts
  );
  const isEditMode = useSelector((state: StoreState) => state.config.editMode);
  const userId = useSelector((state: StoreState) => state.config.userId);
  const router = useRouter();
  const dispatch = useDispatch();
  const [editedPost, setEditedPost] = useState<Post | null>(null);

  const { state, post } = useSelector((state: StoreState) => {
    if (!state.posts.posts) {
      // Posts are still loading
      return {
        state: PostState.Loading,
        post: null,
      };
    } else {
      // Posts are loaded
      return {
        state: PostState.Loaded,
        post: state.posts.posts?.find(
          (post) => post.id === Number(router.query.id)
        ),
      };
    }
  });

  const isPostLiked = useMemo(() => {
    if (!post) return false;
    return likedPosts.hasOwnProperty(post.id);
  }, [likedPosts, post]);

  useEffect(() => {
    if (post) {
      setEditedPost(post);
    }
  }, [post]);

  function titleEdited(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!editedPost) return;
    setEditedPost({
      ...editedPost,
      title: e.target.value,
    });
  }

  function contentEdited(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!editedPost) return;
    setEditedPost({
      ...editedPost,
      body: e.target.value,
    });
  }

  function saveChanges() {
    if (editedPost) {
      dispatch(setPost(editedPost));
    }
  }

  function likePost() {
    if (post) {
      dispatch(markPostAsLiked(post.id));
    }
  }

  function unlikePost() {
    if (post) {
      dispatch(unmarkPostAsLiked(post.id));
    }
  }

  let content = (
    <>
      <SmallTitle>{post?.title}</SmallTitle>
      <i>By {post?.userId}</i>
      <PostContent>{post?.body}</PostContent>
    </>
  );

  if (isEditMode) {
    content = (
      <>
        <Label>Title</Label>
        <EditArea
          defaultValue={editedPost?.title}
          onChange={titleEdited}
          height="55px"
        />
        <Label>Content</Label>
        <EditArea
          defaultValue={editedPost?.body}
          onChange={contentEdited}
          height="30%"
        />
        <Button expanded={true} onClick={saveChanges}>
          Save
        </Button>
      </>
    );
  }

  // Post is not found
  if (state == PostState.Loaded && !post) {
    content = (
      <Message>
        <MessageText>Post not found.</MessageText>
      </Message>
    );
  }

  // Post is loading...
  if (state == PostState.Loading && !post) {
    content = (
      <Message>
        <MessageText>Loading post...</MessageText>
      </Message>
    );
  }

  return (
    <CenteredLayout>
      <Head>
        <title>{post?.title}</title>
      </Head>
      {userId && (
        <Sidebar>
          <SidebarButton
            expanded={false}
            onClick={isPostLiked ? unlikePost : likePost}
          >
            {isPostLiked ? <FilledStar /> : <Star />}
          </SidebarButton>
          <SidebarButton
            expanded={false}
            onClick={() => alert("Not supported!")}
          >
            <Bookmark />
          </SidebarButton>
        </Sidebar>
      )}
      <main>
        <Navbar />
        {content}
      </main>
    </CenteredLayout>
  );
}
