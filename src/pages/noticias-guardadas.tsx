import AppScheme from "../components/AppScheme";
import { Box, Title, Text } from "@mantine/core";
import ArticlesList from "../components/ArticlesList";

export default function IndexPage() {
  return (
    <AppScheme>
      <Title order={1}>Guardadas</Title>
      <Text color="dimmed" size="xs" mt={5}>
        Veja as noticias que você guardou ordenadas da mais recente à mais
        antiga.
      </Text>

      <Box mt={10}>
        <ArticlesList />
      </Box>
    </AppScheme>
  );
}
