import AppScheme from "../components/AppScheme";
import { Box, Title, Text } from "@mantine/core";
import ArticlesList from "../components/ArticlesList";
import { IUserLogged } from "../interfaces/IUser";
import { redirectIfNoUser } from "../helpers/redirectIfNoUser";
import UserProvider from "../context/UserProvider";
import usePost from "../hooks/usePost";

interface PageProps {
  user: IUserLogged;
}

export default function IndexPage({ user }: PageProps) {
  const { mySavedPosts } = usePost();

  return (
    <UserProvider user={user}>
      <AppScheme>
        <Box mt={10}>
          <ArticlesList
            title="Guardadas"
            text={
              <>
                Veja as noticias que você guardou ordenadas da mais recente à
                mais antiga.
              </>
            }
            posts={mySavedPosts.data?.post_saveds.map((saved) => saved.post)}
          />
        </Box>
      </AppScheme>
    </UserProvider>
  );
}

export const getServerSideProps = redirectIfNoUser;
