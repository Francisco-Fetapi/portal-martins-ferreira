import {
  createStyles,
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

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.xs,
    marginBottom: 10,
  },
}));

interface CommentSimpleProps {
  created_at: Date;
  body: string;
  likes: number;
  liked: boolean;
  dislikes: number;
  disliked: boolean;
  isMine: boolean;
  author: {
    name: string;
    image: string;
  };
}

export function CommentSimple({
  created_at,
  body,
  author,
  likes,
  dislikes,
  liked,
  disliked,
  isMine,
}: CommentSimpleProps) {
  const { classes } = useStyles();

  return (
    <div>
      <Group
        style={{
          justifyContent: "space-between",
        }}
      >
        <Group>
          <Avatar src={author.image} alt={author.name} radius="xl" />
          <div>
            <Link href="/perfil/2">
              <Anchor size="sm">{author.name}</Anchor>
            </Link>
            <Text size="xs" color="dimmed">
              {dateDistance(created_at)}
            </Text>
          </div>
        </Group>
        <div>
          {isMine && (
            <MenuComment comment={body} id={2}>
              <UnstyledButton color="gray">...</UnstyledButton>
            </MenuComment>
          )}
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {body}
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
          >
            {likes}
          </Button>

          <Button
            color={disliked ? "red" : "gray"}
            size="xs"
            variant="light"
            leftIcon={<IconThumbDown size={15} />}
          >
            {dislikes}
          </Button>
        </Group>
      </div>
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
