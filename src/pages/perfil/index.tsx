import AppScheme from "../../components/AppScheme";
import { UserInfo } from "../../components/UserInfo";
import { Text, Box, Title } from "@mantine/core";
import PostArea from "../../components/PostArea";
import ArticlesList from "../../components/ArticlesList";
import { useSelector } from "react-redux";
import useUser from "../../hooks/useUser";
import { IUserLogged } from "../../interfaces/IUser";
import { redirectIfNoUser } from "../../helpers/redirectIfNoUser";
import UserProvider from "../../context/UserProvider";

interface PageProps {
  user: IUserLogged;
}

export default function ProfilePage({ user }: PageProps) {
  return (
    <UserProvider user={user}>
      <AppScheme>
        <UserInfo user={user} isMine />
        <Box
          mt={30}
          sx={{
            maxWidth: 550,
          }}
        >
          <PostArea />
        </Box>

        <Box mt={30}>
          <Title order={2}>Publicados por mim</Title>
          <Text color="dimmed" size="xs" mt={5}>
            Todas as noticias publicadas por você são exibidas nesta seção desde
            a mais recente à mais antiga.
          </Text>
        </Box>

        <Box mt={30}>
          <ArticlesList />
        </Box>
      </AppScheme>
    </UserProvider>
  );
}

export const getServerSideProps = redirectIfNoUser;
