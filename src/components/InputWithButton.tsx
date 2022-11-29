import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight, IconArrowLeft, IconMessage } from "@tabler/icons";

interface InputWithButtonProps extends TextInputProps {
  onClick: () => void;
  loading: boolean;
}

export function InputWithButton({
  onClick,
  loading,
  ...props
}: InputWithButtonProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconMessage size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          onClick={loading ? undefined : onClick}
          size={32}
          radius="xl"
          //   color={theme.primaryColor}
          variant="filled"
          loading={loading}
        >
          {!loading && theme.dir === "ltr" ? (
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
