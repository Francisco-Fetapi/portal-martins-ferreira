import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight, IconArrowLeft, IconMessage } from "@tabler/icons";

interface InputWithButtonProps extends TextInputProps {
  onClick: () => void;
}

export function InputWithButton({ onClick, ...props }: InputWithButtonProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconMessage size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          onClick={onClick}
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      rightSectionWidth={42}
      {...props}
    />
  );
}
