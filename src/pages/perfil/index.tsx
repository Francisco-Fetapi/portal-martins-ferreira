import AppScheme from "../../components/AppScheme";
import { UserInfo } from "../../components/UserInfo";
import { Text, Box, Title } from "@mantine/core";
import PostArea from "../../components/PostArea";
import ArticlesList from "../../components/ArticlesList";

export default function IndexPage() {
  return (
    <AppScheme>
      <UserInfo
        user={{
          name: "Nome do Usuario",
          phoneNumber: 934312217,
          photo: "/user.jpg",
          email: "emaildousuario@gmail.com",
          genre: "m",
          myCourse: "Nome do Curso",
          birthday: new Date().toLocaleDateString(),
          myGlade: 12,
          myClass: "Turma 2",
        }}
      />
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
