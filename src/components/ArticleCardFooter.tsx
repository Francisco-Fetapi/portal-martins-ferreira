import {
  createStyles,
  Tooltip,
  Anchor,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Title,
  LoadingOverlay,
  Avatar,
  Badge,
  Spoiler,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import {
  IconHeart,
  IconThumbDown,
  IconBookmark,
  IconMessage,
  IconThumbUp,
  IconTrash,
  IconEdit,
  IconInfoCircle,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { ApiPost } from "../api/interfaces";
import { DISLIKED, LIKED, NO_PHOTO } from "../helpers/constants";
import dateDistance from "../helpers/dateDistance";
import getPhoto from "../helpers/getPhoto";
import useGlobalStyles from "../hooks/useGlobalStyles";
import { useMemo, useEffect } from "react";
import useUser from "../hooks/useUser";
import { IUserLogged } from "../interfaces/IUser";
import Link from "next/link";
import usePost from "../hooks/usePost";
import { customLoader } from "./CustomLoader";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    position: "relative",
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

interface ArticleCardFooterProps {
  long?: boolean;
  post: ApiPost;
  user?: IUserLogged;
}

export function ArticleCardFooter({
  post,
  long,
  user,
}: ArticleCardFooterProps) {
  const { classes, theme } = useStyles();
  const router = useRouter();
  const { user: userLogged } = useUser();
  const { savePostToggle, isSaved, likePost, dislikePost, deleteReact } =
    usePost();

  const thisPostIsSaved = isSaved(post);

  function handleDelete() {
    openConfirmModal({
      title: "Tem certeza",
      children: "Você está prestes a apagar esta noticia.",
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      onConfirm() {
        console.log("Notica apagado.");
      },
    });
  }

  if (user) {
    post.user = user;
  }

  const isMyPost = userLogged.id === post.user.id;
  const isLoading =
    savePostToggle.isLoading ||
    deleteReact.isLoading ||
    likePost.isLoading ||
    dislikePost.isLoading;

  const likes = useMemo(() => {
    return post.post_reacts.filter((react) => react.type === LIKED).length;
  }, [post]);
  const dislikes = useMemo(() => {
    return post.post_reacts.filter((react) => react.type === DISLIKED).length;
  }, [post]);

  const liked = useMemo(() => {
    return post?.post_reacts.some((react) => {
      return react.user.id === userLogged.id && react.type === LIKED;
    });
  }, [post]);

  const disliked = useMemo(() => {
    return post?.post_reacts.some((react) => {
      return react.user.id === userLogged.id && react.type === DISLIKED;
    });
  }, [post]);

  useEffect(() => {
    console.log("Post mudou");
    console.log(post);
  }, [post]);

  function handleLike() {
    if (liked) {
      deleteReact.mutate({ post });
    } else {
      if (disliked) {
        deleteReact.mutate({ post });
      }
      likePost.mutate({ post });
    }
  }

  function handleDislike() {
    if (disliked) {
      deleteReact.mutate({ post });
    } else {
      if (liked) {
        deleteReact.mutate({ post });
      }
      dislikePost.mutate({ post });
    }
  }

  return (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      {post.photo && (
        <Card.Section mb="sm">
          <Image
            src={getPhoto(post.photo, "medium")}
            alt={post.title}
            height={250}
          />
        </Card.Section>
      )}

      <Title order={4} className={classes.title} mt="xs">
        {post.title}
      </Title>
      <Group spacing={10} my={3} mb={15}>
        <Text color="dimmed" size="xs">
          <Group spacing={1}>
            <IconThumbUp size={18} />
            <div>{likes} pessoas</div>
          </Group>
        </Text>
        <Text color="dimmed" size="xs">
          <Group spacing={1}>
            <IconThumbDown size={18} />
            <div>{dislikes} pessoas</div>
          </Group>
        </Text>
        {!post.approved && (
          <Text color="red" size="xs">
            <Group spacing={3} align="flex-end">
              <IconInfoCircle size={18} />
              <div>Necessita de aprovação.</div>
            </Group>
          </Text>
        )}
      </Group>
      <Text size="sm">
        {!long ? (
          <Spoiler
            maxHeight={90}
            showLabel="Mostrar mais"
            hideLabel="Mostrar menos"
            transitionDuration={0}
          >
            {post.content}
          </Spoiler>
        ) : (
          <>{post.content}</>
        )}
      </Text>

      <Group mt="xl" spacing={10}>
        <Avatar
          src={getPhoto(post.user.photo!, "small") || NO_PHOTO}
          alt="Foto do usuario"
          style={{ borderRadius: "50%", width: 40, height: 40, zoom: 0.9 }}
        />
        <div>
          <Link href={isMyPost ? "/perfil" : `/perfil/${post.user.id}`}>
            <Anchor size="xs" weight={500}>
              {post.user.username}
            </Anchor>
          </Link>

          <Text size="xs" color="dimmed">
            {dateDistance(new Date(post.publishedAt))}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <LoadingOverlay
          visible={isLoading}
          overlayBlur={2}
          loaderProps={{ size: "sm", color: "blue", variant: "bars" }}
          overlayOpacity={0.5}
          loader={customLoader}
          zIndex={2}
        />
        <Group position="apart">
          <Text size="xs" color="dimmed">
            <Group spacing={1}>
              <IconMessage />
              <div>{post.post_comments.length} comentários</div>
            </Group>
          </Text>
          <Group spacing={10}>
            {post.approved && (
              <>
                <PostIcon
                  icon={
                    <IconThumbUp
                      size={18}
                      color={liked ? "black" : theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  }
                  title={liked ? "gostado" : "gostar"}
                  color={liked ? theme.colors.blue[6] : undefined}
                  onClick={handleLike}
                />
                <PostIcon
                  icon={
                    <IconThumbDown
                      size={18}
                      color={disliked ? "black" : theme.colors.cyan[6]}
                      stroke={1.5}
                    />
                  }
                  title={disliked ? "não gostado" : "não gostar"}
                  color={disliked ? theme.colors.cyan[6] : undefined}
                  onClick={handleDislike}
                />
              </>
            )}
            {!long && (
              <PostIcon
                icon={
                  <IconMessage
                    size={18}
                    color={theme.colors.green[6]}
                    stroke={1.5}
                  />
                }
                title="comentar"
                onClick={() => router.push("/noticia/" + post.id)}
              />
            )}
            {isMyPost && (
              <>
                <PostIcon
                  icon={
                    <IconEdit
                      size={18}
                      color={theme.colors.gray[6]}
                      stroke={1.5}
                    />
                  }
                  title="editar"
                  onClick={() => router.push("/noticia/editar/" + post.id)}
                />
                <PostIcon
                  icon={
                    <IconTrash
                      size={18}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }
                  title="apagar"
                  onClick={handleDelete}
                />
              </>
            )}
            {post.approved && (
              <PostIcon
                icon={
                  <IconBookmark
                    size={18}
                    color={thisPostIsSaved ? "black" : theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
                title={thisPostIsSaved ? "guardado" : "guardar"}
                onClick={() => savePostToggle.mutate({ post })}
                color={thisPostIsSaved ? theme.colors.yellow[6] : undefined}
              />
            )}
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

interface PostIconProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  color?: string;
}

function PostIcon({ icon, color, title, onClick }: PostIconProps) {
  const { classes } = useGlobalStyles();
  return (
    <Tooltip label={title}>
      <ActionIcon
        className={classes.background}
        onClick={onClick}
        style={{
          background: color,
        }}
      >
        {icon}
      </ActionIcon>
    </Tooltip>
  );
}
