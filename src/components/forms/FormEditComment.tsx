import { Button, Center, Textarea } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { closeAllModals } from "@mantine/modals";
import { ApiComment } from "../../api/interfaces";
import usePost from "../../hooks/usePost";

interface FormEditCommentProps {
  comment: ApiComment;
}

export default function FormEditComment({ comment }: FormEditCommentProps) {
  const [content, handleContent] = useInputState(comment.content);
  const { editComment } = usePost();

  function handleUpdate() {
    editComment.mutate(
      { content, comment },
      {
        onSuccess() {
          closeAllModals();
        },
      }
    );
  }

  return (
    <div>
      <Textarea
        label="Comentário"
        placeholder="Escreva um comentário"
        autosize
        minRows={4}
        maxRows={7}
        value={content}
        onChange={handleContent}
      />
      <Center>
        <Button loading={editComment.isLoading} onClick={handleUpdate} mt="md">
          Concluido
        </Button>
      </Center>
    </div>
  );
}
