import { Box, Text, Title } from "@mantine/core";
import AppScheme from "../components/AppScheme";
import ArticlesList from "../components/ArticlesList";

export default function IndexPage() {
  return (
    <AppScheme>
      <Box mb={30}>
        <Title order={1}>Noticias</Title>
        <Text size="sm" color="dimmed" mt={5}>
          Veja as últimas noticias do <b>Obadias Malaquias</b> em primeira mão.
        </Text>
      </Box>
      <ArticlesList />
    </AppScheme>
  );
}
