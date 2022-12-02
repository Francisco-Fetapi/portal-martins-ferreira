import { useInputState } from "@mantine/hooks";
import { ApiPost } from "../../api/interfaces";
import usePost from "../../hooks/usePost";
import { InputWithButton } from "../InputWithButton";
import { useEffect } from "react";

interface FormCommentProps {
  post: ApiPost;
}

export default function FormComment({ post }: FormCommentProps) {
  const [comment, handleComment] = useInputState("");
  const { postComment } = usePost();

  function sendComment() {
    if (comment) {
      postComment.mutate({ comment, post });
    }
  }

  useEffect(() => {
    handleComment("");
  }, [postComment.isLoading]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendComment();
      }}
      autoComplete="off"
    >
      <InputWithButton
        onClick={sendComment}
        placeholder="Escreva um comentário"
        value={comment}
        onChange={handleComment}
        loading={postComment.isLoading}
      />
    </form>
  );
}
