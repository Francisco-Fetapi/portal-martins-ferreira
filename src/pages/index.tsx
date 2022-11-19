import { Box, Text, Title } from "@mantine/core";
import AppScheme from "../components/AppScheme";
import ArticlesList from "../components/ArticlesList";
import { redirectIfNoUser } from "../helpers/redirectIfNoUser";
import { IUserLogged } from "../interfaces/IUser";

interface PageProps {
  user: IUserLogged;
}

export default function IndexPage({ user }: PageProps) {
  return (
    <AppScheme>
      <Box mb={30}>
        <Title order={1}>Noticias</Title>
        <Text size="sm" color="dimmed" mt={5}>
          Veja as últimas noticias do <b>Obadias Malaquias</b> em primeira mão.
        </Text>
        {user.username}
      </Box>
      <ArticlesList />
    </AppScheme>
  );
}

export const getServerSideProps = redirectIfNoUser;
