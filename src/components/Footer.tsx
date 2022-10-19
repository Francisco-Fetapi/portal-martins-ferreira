import { Box } from "@mantine/core";

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
      <Box mb={2}>Footer</Box>
    </Box>
  );
}
