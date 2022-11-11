import { Box, Text, Title } from "@mantine/core";
import AppScheme from "../components/AppScheme";
import { ArticleCardFooter } from "../components/ArticleCardFooter";

export default function IndexPage() {
  return (
    <AppScheme>
      <Box mb={30}>
        <Title order={1}>Noticias</Title>
        <Text size="sm" color="dimmed">
          Veja as últimas noticias do <b>Obadias Malaquias</b> em primeira mão.
        </Text>
      </Box>
      <ArticleCardFooter
        post={{
          title: "Titulo da Noticia",
          content:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex inventore exercitationem commodi ullam excepturi maiores aperiam accusamus, sint mollitia? Dolores voluptatibus quis neque? Quis amet quae, molestias doloremque beatae ab?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex inventore exercitationem commodi ullam excepturi maiores aperiam accusamus, sint mollitia? Dolores voluptatibus quis neque? Quis amet quae, molestias doloremque beatae ab?",
          comments: 12,
          created_at: new Date(2022, 11, 1),
          disLikes: 2,
          likes: 14,
          image: "/img/image1.jpg",
        }}
        user={{
          image: "/user.jpg",
          name: "Nome do Usuario",
        }}
      />
    </AppScheme>
  );
}
