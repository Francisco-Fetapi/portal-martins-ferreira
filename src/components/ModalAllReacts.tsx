import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  Text,
  Anchor,
  Avatar,
  Grid,
  Modal,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ApiPost, ApiReact } from "../api/interfaces";
import { useEffect } from "react";
import { LIKED, NO_PHOTO } from "../helpers/constants";
import { IconThumbDown, IconThumbUp } from "@tabler/icons";
import dateDistance from "../helpers/dateDistance";
import Link from "next/link";
import useUser from "../hooks/useUser";
import getPhoto from "../helpers/getPhoto";

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
      size="md"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      centered={false}
      title={<Title order={4}>Reações ({post.post_reacts.length})</Title>}
      transition="slide-down"
      transitionDuration={200}
      transitionTimingFunction="ease-in-out"
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
  const { user } = useUser();
  const isMine = user.id === post_react.user.id;

  return (
    <Grid align="center" grow gutter="md" m={0} p={0}>
      <Grid.Col span={1}>
        <Avatar
          src={getPhoto(post_react.user.photo!, "small") || NO_PHOTO}
          sx={{
            borderRadius: "50%",
          }}
        />
      </Grid.Col>
      <Grid.Col span={9}>
        <Link href={isMine ? "/perfil" : `/perfil/${post_react.user.id}`}>
          <Anchor>{post_react.user.username}</Anchor>
        </Link>
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
