import { Box, Center, Anchor } from "@mantine/core";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
      }}
      component="footer"
    >
      <Center px={2} mb={2} style={{ listStyle: "none" }}>
        <li>
          <Link href="/criar-conta">
            <Anchor>Criar conta</Anchor>
          </Link>
        </li>
        <Box ml={10}>
          <li>
            <Link href="/iniciar-sessao">
              <Anchor>Login</Anchor>
            </Link>
          </li>
        </Box>
      </Center>
    </Box>
  );
}
