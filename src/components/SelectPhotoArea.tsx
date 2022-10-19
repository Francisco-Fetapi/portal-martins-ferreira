import {
  Box,
  Button,
  Center,
  Container,
  FileButton,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function SelectPhotoArea() {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  console.log(file);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };
  return (
    <Center p={5}>
      <Stack>
        <Container sx={{ height: 64 }}>
          <Image
            src="/user.jpg"
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
          <Button disabled={!file} color="red" onClick={clearFile}>
            Limpar foto
          </Button>
        </Center>
        <Center>
          <Button>Concluir</Button>
        </Center>
      </Stack>
    </Center>
  );
}
