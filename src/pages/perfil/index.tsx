import AppScheme from "../../components/AppScheme";
import { UserInfo } from "../../components/UserInfo";
import { Text, Box, Title, Skeleton } from "@mantine/core";
import PostArea from "../../components/PostArea";
import ArticlesList from "../../components/ArticlesList";
import { useSelector } from "react-redux";
import useUser from "../../hooks/useUser";
import { IUserLogged } from "../../interfaces/IUser";
import { redirectIfNoUser } from "../../helpers/redirectIfNoUser";
import UserProvider from "../../context/UserProvider";
import { useForm } from "@mantine/form";
import { useState, useCallback } from "react";
import {
  ApiPost,
  ApiRequest,
  ApiResponse,
  ApiUploadDataResponse,
} from "../../api/interfaces";
import { strapi } from "../../api/strapi";
import { AxiosResponse } from "axios";
import { showNotification } from "@mantine/notifications";
import usePost from "../../hooks/usePost";
import parsePost from "../../helpers/parsePost";
interface PageProps {
  user: IUserLogged;
}

export default function ProfilePage({ user }: PageProps) {
  const { myPosts } = usePost();

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
          <PostAreaProfile user={user} />
        </Box>

        <Box mt={30}>
          <ArticlesList
            title="Publicados por mim"
            text="Todas as noticias publicadas por você são exibidas nesta seção desde
            a mais recente à mais antiga."
            posts={myPosts.data}
            user={user}
          />
        </Box>
      </AppScheme>
    </UserProvider>
  );
}

interface PostAreaProfileProps {
  user: IUserLogged;
}

function PostAreaProfile({ user }: PostAreaProfileProps) {
  const form = useForm({
    initialValues: {
      content: "",
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePost = useCallback(async () => {
    const { title, content } = parsePost(form.values.content);

    try {
      setLoading(true);
      let res = await strapi.post<
        ApiRequest<ApiPost>,
        AxiosResponse<ApiResponse<ApiPost>>
      >("/posts", {
        data: {
          title: title.trim(),
          content: content.trim(),
          user,
        },
      });

      const post = res.data.data.attributes;
      const postId = res.data.data.id;
      console.log("post", post);
      console.log("postId", postId);

      if (file) {
        const form = new FormData();
        form.append("ref", "api::post.post");
        form.append("refId", String(postId));
        form.append("field", "photo");
        form.append("files", file);

        let { data: photosUploaded } = await strapi.post<
          ApiUploadDataResponse[]
        >("/upload", form);
      }
      showNotification({
        title: "Noticia publicada",
        message: "A sua noticia foi publicada com sucesso.",
        color: "green",
      });
      form.reset();
      setFile(null);
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  }, [form.values, user, file]);

  return (
    <PostArea
      file={file}
      setFile={setFile}
      handleSubmit={() => handlePost()}
      form={form}
      isLoading={loading}
    />
  );
}

export const getServerSideProps = redirectIfNoUser;
