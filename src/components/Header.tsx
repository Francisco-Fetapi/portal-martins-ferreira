import {
  Button,
  Box,
  useMantineColorScheme,
  Text,
  Center,
} from "@mantine/core";

export default function Header() {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <Center
      sx={{
        flexDirection: "column",
      }}
    >
      <Box mb={14}>
        <Text align="center" size={24}>
          Portal Obadias Malaquias - Pagina principal
        </Text>
        <Text align="center" size="sm">
          Aqui ficará a página principal
        </Text>
      </Box>
      <Button size="xl" onClick={() => toggleColorScheme()}>
        Mudar tema
      </Button>
    </Center>
  );
}
