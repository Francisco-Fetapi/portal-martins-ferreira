import { Box, Text, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import AppScheme from "../components/AppScheme";
import ArticlesList from "../components/ArticlesList";
import { selectUserData } from "../store/App.selectors";

export default function IndexPage() {
  const user = useSelector(selectUserData);
  console.log(user);

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
