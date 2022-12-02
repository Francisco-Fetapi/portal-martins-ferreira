import { useDisclosure } from "@mantine/hooks";
import {
  Text,
  Anchor,
  Grid,
  Modal,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ApiPost, ApiReact } from "../api/interfaces";
import { useEffect } from "react";
import { LIKED } from "../helpers/constants";
import { IconThumbDown, IconThumbUp } from "@tabler/icons";
import dateDistance from "../helpers/dateDistance";

interface ModalAllReactsProps {
  modal: ReturnType<typeof useDisclosure>;
  post: ApiPost;
}

export default function ModalAllReacts({ modal, post }: ModalAllReactsProps) {
  const [opened, { close }] = modal;
  const theme = useMantineTheme();

  useEffect(() => {
    if (opened) {
      console.log("post_reacts", post.post_reacts);
    }
  }, [opened]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="xs"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      centered={false}
      title={<Title order={4}>Reações ({post.post_reacts.length})</Title>}
    >
      {post.post_reacts.map((post_react) => (
        <ReactItem post_react={post_react} key={post_react.id} />
      ))}
    </Modal>
  );
}

interface ReactItemProps {
  post_react: ApiReact;
}

function ReactItem({ post_react }: ReactItemProps) {
  const iconSize = 20;
  return (
    <Grid align="center">
      <Grid.Col span={11}>
        <Anchor>{post_react.user.username}</Anchor>
        <Text size="xs" color="dimmed">
          {dateDistance(new Date(post_react.createdAt))}
        </Text>
      </Grid.Col>
      <Grid.Col span={1}>
        {post_react.type === LIKED ? (
          <IconThumbUp size={iconSize} />
        ) : (
          <IconThumbDown size={iconSize} />
        )}
      </Grid.Col>
    </Grid>
  );
}
