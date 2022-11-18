import AppScheme from "../../components/AppScheme";
import { UserInfo } from "../../components/UserInfo";
import { Text, Box, Title } from "@mantine/core";
import PostArea from "../../components/PostArea";
import ArticlesList from "../../components/ArticlesList";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/App.selectors";

export default function ProfilePage() {
  const userLogged = useSelector(selectUserData);

  return (
    <AppScheme>
      <UserInfo user={userLogged} />
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
          Todas as noticias publicadas por você são exibidas nesta seção desde a
          mais recente à mais antiga.
        </Text>
      </Box>

      <Box mt={30}>
        <ArticlesList />
      </Box>
    </AppScheme>
  );
}
