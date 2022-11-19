import AppScheme from "../components/AppScheme";
import { Box, Title, Text } from "@mantine/core";
import ArticlesList from "../components/ArticlesList";
import { IUserLogged } from "../interfaces/IUser";
import { redirectIfNoUser } from "../helpers/redirectIfNoUser";
import UserProvider from "../context/UserProvider";

interface PageProps {
  user: IUserLogged;
}

export default function IndexPage({ user }: PageProps) {
  return (
    <UserProvider user={user}>
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
    </UserProvider>
  );
}

export const getServerSideProps = redirectIfNoUser;
