import { Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import PostArea from "../PostArea";
import { useState } from "react";
import {
  ApiPost,
  ApiRequest,
  ApiResponse,
  ApiUploadDataResponse,
} from "../../api/interfaces";
import { AxiosResponse } from "axios";
import { strapi } from "../../api/strapi";
import parsePost from "../../helpers/parsePost";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";

interface FormPostEditProps {
  post: ApiPost;
}

export default function FormPostEdit({ post }: FormPostEditProps) {
  const content = `${post.title}\n${post.content}`;
  const form = useForm({
    initialValues: {
      content,
    },
  });
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    const { title, content } = parsePost(form.values.content);
    try {
      setLoading(true);
      let res = await strapi.put<
        ApiRequest<ApiPost>,
        AxiosResponse<ApiResponse<ApiPost>>
      >("/posts/" + post.id, {
        data: {
          title,
          content,
          approved: false,
        },
      });
      if (file) {
        if (post.photo) {
          await strapi.delete("/upload/files/" + post.photo.id);
        }
        const form = new FormData();
        form.append("ref", "api::post.post");
        form.append("refId", String(post.id));
        form.append("field", "photo");
        form.append("files", file);

        await strapi.post<ApiUploadDataResponse[]>("/upload", form);
      }
      setLoading(false);
      router.back();
    } catch (e: any) {
      showNotification({
        title: "Erro ao editar noticia",
        message: "Houve um erro ao editar a noticia.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Stack style={{ flexDirection: "column" }}>
        <PostArea
          buttonText="Concluido"
          file={file}
          setFile={setFile}
          handleSubmit={handleSubmit}
          form={form}
          isLoading={loading}
        />
      </Stack>
    </div>
  );
}
