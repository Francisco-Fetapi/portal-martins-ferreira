import { Anchor, Title, Box, Textarea, Center, Button } from "@mantine/core";
import ArticlesList from "./ArticlesList";

export default function PostArea() {
  return (
    <div>
      <Textarea
        label="Escreva alguma notícia"
        placeholder="O que há de novo?"
        autosize
        minRows={4}
        maxRows={9}
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
        <Button>Publicar</Button>
      </Center>

      <Box mt={30}>
        <Title order={2}>Publicados por mim</Title>
      </Box>

      <Box mt={30}>
        <ArticlesList />
      </Box>
    </div>
  );
}
