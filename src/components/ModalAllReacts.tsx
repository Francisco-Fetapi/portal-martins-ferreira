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
import { ApiComment, ApiPost, ApiReact } from "../api/interfaces";
import { useEffect } from "react";
import { LIKED, NO_PHOTO } from "../helpers/constants";
import { IconThumbDown, IconThumbUp } from "@tabler/icons";
import dateDistance from "../helpers/dateDistance";
import Link from "next/link";
import useUser from "../hooks/useUser";
import getPhoto from "../helpers/getPhoto";

interface ModalAllReactsProps {
  modal: ReturnType<typeof useDisclosure>;
  post?: ApiPost;
  comment?: ApiComment;
}

export default function ModalAllReacts({
  modal,
  post,
  comment,
}: ModalAllReactsProps) {
  const [opened, { close }] = modal;
  const theme = useMantineTheme();

  const reacts = (post ? post?.post_reacts : comment?.comment_reacts)!;

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
      title={<Title order={4}>Reações ({reacts.length})</Title>}
      transition="slide-down"
      transitionDuration={200}
      transitionTimingFunction="ease-in-out"
    >
      {reacts.map((react) => (
        <ReactItem react={react} key={react.id} />
      ))}
    </Modal>
  );
}

interface ReactItemProps {
  react: ApiReact;
}

function ReactItem({ react }: ReactItemProps) {
  const iconSize = 20;
  const { user } = useUser();
  const isMine = user.id === react.user.id;

  return (
    <Grid align="center" grow gutter="md" m={0} p={0}>
      <Grid.Col span={1}>
        <Avatar
          src={getPhoto(react.user.photo!, "small") || NO_PHOTO}
          sx={{
            borderRadius: "50%",
          }}
        />
      </Grid.Col>
      <Grid.Col span={9}>
        <Link href={isMine ? "/perfil" : `/perfil/${react.user.id}`}>
          <Anchor>{react.user.username}</Anchor>
        </Link>
        <Text size="xs" color="dimmed">
          {dateDistance(new Date(react.createdAt))}
        </Text>
      </Grid.Col>
      <Grid.Col span={1}>
        {react.type === LIKED ? (
          <IconThumbUp size={iconSize} />
        ) : (
          <IconThumbDown size={iconSize} />
        )}
      </Grid.Col>
    </Grid>
  );
}
