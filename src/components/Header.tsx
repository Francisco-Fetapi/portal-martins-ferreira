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
        <Text size={24}>NextJs + Mantine Boilerplate</Text>
      </Box>
      <Button size="xl" onClick={() => toggleColorScheme()}>
        Mudar tema
      </Button>
    </Center>
  );
}
