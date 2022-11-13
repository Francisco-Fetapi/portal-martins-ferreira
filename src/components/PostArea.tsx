import { Anchor, Textarea, Center, Button } from "@mantine/core";

interface PostAreaProps {
  buttonText?: string;
}
// 2 componentes estao usando. Agnostico ao lugar que requisitado
// get the form returned by useForm
export default function PostArea({ buttonText }: PostAreaProps) {
  return (
    <div>
      <Textarea
        label="Escreva alguma notícia"
        placeholder="O que há de novo?"
        autosize
        minRows={4}
        maxRows={9}
        required
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 5,
        }}
      >
        <Anchor size="xs">Escolher foto</Anchor>
      </div>
      <Center mt={1}>
        <Button>{buttonText || "Publicar"}</Button>
      </Center>
    </div>
  );
}
