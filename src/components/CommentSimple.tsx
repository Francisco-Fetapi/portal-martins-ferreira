import {
  createStyles,
  LoadingOverlay,
  Text,
  Anchor,
  Avatar,
  Group,
  Button,
  UnstyledButton,
  Menu,
  Textarea,
  Center,
} from "@mantine/core";
import { IconEdit, IconTrash, IconThumbUp, IconThumbDown } from "@tabler/icons";
import dateDistance from "../helpers/dateDistance";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import Link from "next/link";
import { ApiComment } from "../api/interfaces";
import getPhoto from "../helpers/getPhoto";
import useUser from "../hooks/useUser";
import { useMemo } from "react";
import { DISLIKED, LIKED } from "../helpers/constants";
import usePost from "../hooks/usePost";
import { customLoader } from "./CustomLoader";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.xs,
    marginBottom: 10,
  },
}));

interface CommentSimpleProps {
  comment: ApiComment;
}

export function CommentSimple({ comment }: CommentSimpleProps) {
  const { classes } = useStyles();
  const author = comment.user;
  const { user } = useUser();
  const isMyComment = author.id === user.id;
  const { likeComment, dislikeComment, deleteReactComment } = usePost();

  const isLoading =
    likeComment.isLoading ||
    dislikeComment.isLoading ||
    deleteReactComment.isLoading;

  const likes = useMemo(() => {
    return comment.comment_reacts.filter((react) => react.type === LIKED)
      .length;
  }, [comment]);
  const dislikes = useMemo(() => {
    return comment.comment_reacts.filter((react) => react.type === DISLIKED)
      .length;
  }, [comment]);

  const liked = useMemo(() => {
    return comment.comment_reacts.some((react) => {
      return react.user.id === user.id && react.type === LIKED;
    });
  }, [comment.comment_reacts]);

  const disliked = useMemo(() => {
    return comment.comment_reacts.some((react) => {
      return react.user.id === user.id && react.type === DISLIKED;
    });
  }, [comment.comment_reacts]);

  function handleLike() {
    if (liked) {
      deleteReactComment.mutate({ comment });
    } else {
      if (disliked) {
        deleteReactComment.mutate({ comment });
      }
      likeComment.mutate({ comment });
    }
  }

  function handleDislike() {
    if (disliked) {
      deleteReactComment.mutate({ comment });
    } else {
      if (liked) {
        deleteReactComment.mutate({ comment });
      }
      dislikeComment.mutate({ comment });
    }
  }

  return (
    <div
      style={{
        position: "relative",
        padding: "20px auto",
      }}
    >
      <Group
        style={{
          justifyContent: "space-between",
        }}
      >
        <LoadingOverlay
          visible={isLoading}
          overlayBlur={2}
          loaderProps={{ size: "sm", color: "blue", variant: "bars" }}
          overlayOpacity={0.5}
          loader={customLoader}
          zIndex={2}
        />
        <Group>
          <Avatar
            src={getPhoto(author.photo!, "small")}
            alt={author.username}
            radius="xl"
          />
          <div>
            <Link href={isMyComment ? "/perfil" : `/perfil/${author.id}`}>
              <Anchor size="sm">{author.username}</Anchor>
            </Link>
            <Text size="xs" color="dimmed">
              {dateDistance(new Date(comment.createdAt))}
            </Text>
          </div>
        </Group>
        <div>
          {isMyComment && (
            <MenuComment comment={comment.content} id={2}>
              <UnstyledButton color="gray">...</UnstyledButton>
            </MenuComment>
          )}
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {comment.content}
      </Text>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Group spacing={2}>
          <Button
            color={liked ? "blue" : "gray"}
            size="xs"
            variant="light"
            leftIcon={<IconThumbUp size={15} />}
            onClick={handleLike}
          >
            {likes}
          </Button>

          <Button
            color={disliked ? "red" : "gray"}
            size="xs"
            variant="light"
            leftIcon={<IconThumbDown size={15} />}
            onClick={handleDislike}
          >
            {dislikes}
          </Button>
        </Group>
      </div>
      <br />
    </div>
  );
}

interface MenuCommentProps {
  children: React.ReactNode;
  comment: string;
  id: number;
}

function MenuComment({ children, comment, id }: MenuCommentProps) {
  function handleDelete() {
    openConfirmModal({
      title: "Tem certeza",
      children: "Você está prestes a apagar este comentário.",
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      onConfirm() {
        console.log("Comentario apagado.");
      },
    });
  }

  function handleEdit() {
    openModal({
      title: "Editar comentário",
      children: (
        <>
          <Textarea
            label="Comentário"
            placeholder="Escreva um comentário"
            autosize
            minRows={4}
            maxRows={7}
            value={comment}
          />
          <Center>
            <Button onClick={() => closeAllModals()} mt="md">
              Concluido
            </Button>
          </Center>
        </>
      ),
    });
  }

  return (
    <Menu withArrow shadow="md" width={200}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Comentário</Menu.Label>
        <Menu.Item onClick={handleEdit} icon={<IconEdit size={14} />}>
          Editar
        </Menu.Item>

        <Menu.Item
          onClick={handleDelete}
          color="red"
          icon={<IconTrash size={14} />}
        >
          Apagar
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
