import { useInputState } from "@mantine/hooks";
import { InputWithButton } from "../InputWithButton";

export default function FormComment() {
  const [comment, handleComment] = useInputState("");

  function sendComment() {
    console.log(comment);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendComment();
      }}
    >
      <InputWithButton
        onClick={sendComment}
        placeholder="Escreva um comentário"
        value={comment}
        onChange={handleComment}
      />
    </form>
  );
}
