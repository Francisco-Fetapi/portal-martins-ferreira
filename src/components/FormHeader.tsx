import { Box, Text, Title } from "@mantine/core";

interface FormHeaderProps {
  children: React.ReactNode;
  title: string;
}

export default function FormHeader({ children, title }: FormHeaderProps) {
  return (
    <Box>
      <Title
        align="center"
        sx={() => ({
          fontWeight: 900,
        })}
      >
        {title}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {children}
      </Text>
    </Box>
  );
}
