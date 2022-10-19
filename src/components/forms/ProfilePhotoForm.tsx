import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Box,
  Center,
  Stack,
} from "@mantine/core";

import Link from "next/link";
import SelectPhotoArea from "../SelectPhotoArea";

export function ProfilePhotoForm() {
  return (
    <Stack my={50}>
      <FormHeader />
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack style={{ flexDirection: "column" }}>
          <SelectPhotoArea />
        </Stack>
      </Paper>
    </Stack>
  );
}

function FormHeader() {
  return (
    <Box>
      <Title
        align="center"
        sx={() => ({
          fontWeight: 900,
        })}
      >
        Foto de Perfil
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Defina uma foto de perfil.{" "}
        <Link href="/" replace>
          <Anchor<"a"> size="sm">Ignorar por agora</Anchor>
        </Link>
      </Text>
    </Box>
  );
}
