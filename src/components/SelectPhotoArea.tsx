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
import { ApiUploadDataResponse } from "../api/interfaces";
import { PHOTO_URL_MAIN, strapi } from "../api/strapi";
import { IUserLogged } from "../interfaces/IUser";
import { selectSignupData } from "../store/App.selectors";
import { IUserFormSigninData, setUserLoggedData } from "../store/App.store";

const DEFAULT_PHOTO = "/user.jpg";

export default function SelectPhotoArea() {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const router = useRouter();
  const [photoSrc, setPhotoSrc] = useState(DEFAULT_PHOTO);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const signupData = useSelector(
    selectSignupData
  ) as Required<IUserFormSigninData>;

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };
  async function handleDone() {
    // await salvar foto no servidor
    // pegar o nome da foto
    const allData: IUserLogged = {
      ...signupData,
      photo_url: PHOTO_URL_MAIN,
      confirmed: true,
      blocked: false,
    };

    console.log("signup", signupData);

    try {
      if (file) {
        const form = new FormData();
        form.append("files", file);
        setLoading(true);
        let { data } = await strapi.post<ApiUploadDataResponse[]>(
          "/upload",
          form
        );
        const photoUploaded = data[0];
        allData.photo_url = photoUploaded.hash + photoUploaded.ext;
      }
      let { data, ...rest } = await strapi.post<IUserLogged>("/users", allData);
      if (data.username) {
        const res = await strapi.post("/auth/local", {
          identifier: data.email,
          password: data.password1,
        });

        console.log("data logged", res.data);
      }
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

    // dispatch(
    //   setUserLoggedData({
    //     ...signupData,
    //     photo: null,
    //   })
    // );
    // router.push("/");
  }
  useEffect(() => {
    if (file) {
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = (e) => {
        setPhotoSrc(String(e.target?.result));
      };
    } else {
      setPhotoSrc(DEFAULT_PHOTO);
    }
  }, [file]);
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
