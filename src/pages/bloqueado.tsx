import { Center, Title, Text, Box } from "@mantine/core";
import AppSchemeSimple from "../components/AppSchemeSimple";

export default function BlockedPage() {
  return (
    <AppSchemeSimple>
      <Center
        sx={{
          minHeight: "90vh",
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
          }}
        >
          <Title align="center" order={2}>
            Você foi bloqueado!
          </Title>
          <Text align="center" size="xs" color="dimmed">
            Por alguma razão você foi bloqueado pelo Administrador. A partir de
            agora não poderá mais acessar o portal a menos que seja
            desbloqueado.
          </Text>
        </Box>
      </Center>
    </AppSchemeSimple>
  );
}
