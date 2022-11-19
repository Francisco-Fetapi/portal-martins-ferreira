import {
  Box,
  Button,
  Center,
  Container,
  FileButton,
  Stack,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ApiRegister, ApiUploadDataResponse } from "../api/interfaces";
import { PHOTO_URL_MAIN, strapi } from "../api/strapi";
import usePhotoPreview from "../hooks/usePhotoPreview";
import { IUserLogged } from "../interfaces/IUser";
import { selectSignupData } from "../store/App.selectors";
import { IUserFormSigninData, setUserLoggedData } from "../store/App.store";

const DEFAULT_PHOTO = "/user.jpg";

export default function SelectPhotoArea() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { clearFile, file, photoSrc, resetRef, setFile } =
    usePhotoPreview(DEFAULT_PHOTO);
  const signupData = useSelector(
    selectSignupData
  ) as Required<IUserFormSigninData>;

  async function handleDone() {
    // await salvar foto no servidor
    // pegar o nome da foto
    const allData = {
      ...signupData,
      confirmed: true,
      blocked: false,
    };

    console.log("signup", allData);

    try {
      let { data: registerInfo } = await strapi.post<ApiRegister>(
        "/auth/local/register",
        allData
      );
      if (file) {
        const form = new FormData();
        form.append("ref", "plugin::users-permissions.user");
        form.append("refId", String(registerInfo.user.id));
        form.append("field", "photo");
        form.append("files", file);
        setLoading(true);
        let { data: photosUploaded } = await strapi.post<
          ApiUploadDataResponse[]
        >("/upload", form);
        registerInfo.user.photo = photosUploaded[0];
      }
      showNotification({
        title: "Conta criada",
        message: "A sua conta foi criada com sucesso!",
        color: "green",
      });

      setTimeout(() => {
        router.replace("/");
      }, 2000);
      console.log("data logged", registerInfo);
      dispatch(setUserLoggedData(registerInfo.user));
    } catch (e: any) {
      console.log(e);
      showNotification({
        title: "Falha ao tentar se Cadastrar",
        message:
          "Certifique-se de estar enviando todos os dados necessários para efetuar o cadastro.",
        color: "red",
      });
    } finally {
      setLoading(false);
      console.log(allData);
    }
  }

  return (
    <Center p={5}>
      <Stack>
        <Container sx={{ height: 64 }}>
          <Image
            src={photoSrc}
            width={64}
            height={64}
            style={{ borderRadius: "50%" }}
            alt="Foto de perfil"
          />
        </Container>
        <Center sx={{ flexDirection: "column" }}>
          <Text size="lg" weight={600}>
            Descarregar uma foto
          </Text>
          <Text align="center" size="sm" weight={300}>
            Será mais fácil para outros elementos do portal te identificarem
            através de uma foto.
          </Text>
        </Center>
        <Center>
          <Box pr={4}>
            <FileButton
              //   resetRef={resetRef}
              onChange={setFile}
              accept="image/png,image/jpeg"
            >
              {(props) => <Button {...props}>Escolher foto</Button>}
            </FileButton>
          </Box>
          {file && (
            <Button color="red" onClick={clearFile}>
              Limpar foto
            </Button>
          )}
        </Center>
        <Center>
          <Button loading={loading} color="green" onClick={handleDone}>
            {file ? "Concluir" : "Ignorar por agora"}
          </Button>
        </Center>
      </Stack>
    </Center>
  );
}
