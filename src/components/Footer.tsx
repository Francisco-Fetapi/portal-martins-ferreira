import { Box, Center } from "@mantine/core";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      component="footer"
    >
      <Center px={2} mb={2}>
        <li>
          <Link href="/criar-conta">Criar conta</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </Center>
    </Box>
  );
}
