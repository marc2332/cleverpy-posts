import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import CenteredLayout from "../../components/CenteredLayout";
import EditArea from "../../components/EditArea";
import Label from "../../components/Label";
import Message, { MessageText } from "../../components/Message";
import Navbar from "../../components/Navbar";
import PostContent from "../../components/PostContent";
import { SmallTitle } from "../../components/Title";
import { setPost, StoreState } from "../../store/store";
import Post from "../../types/posts";

enum PostState {
  Loading,
  Loaded,
}

export default function PostRoute() {
  const isEditMode = useSelector((state: StoreState) => state.config.editMode);
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

  useEffect(() => {
    if (post) {
      setEditedPost(post);
    }
  }, [post]);

  function titleEdited(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditedPost((post) => {
      if (post) {
        return {
          ...post,
          title: e.target.value,
        };
      } else {
        return post;
      }
    });
  }

  function contentEdited(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditedPost((post) => {
      if (post) {
        return {
          ...post,
          body: e.target.value,
        };
      } else {
        return post;
      }
    });
  }

  function saveChanges() {
    if (editedPost) {
      dispatch(setPost(editedPost));
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
      <main>
        <Navbar />
        {content}
      </main>
    </CenteredLayout>
  );
}
