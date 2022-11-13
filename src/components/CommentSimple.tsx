import {
  createStyles,
  Text,
  Avatar,
  Group,
  Button,
  UnstyledButton,
  Menu,
} from "@mantine/core";
import { IconEdit, IconTrash, IconThumbUp, IconThumbDown } from "@tabler/icons";
import dateDistance from "../helpers/dateDistance";
import { openConfirmModal } from "@mantine/modals";

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
            <Text variant="link" size="sm">
              {author.name}
            </Text>
            <Text size="xs" color="dimmed">
              {dateDistance(created_at)}
            </Text>
          </div>
        </Group>
        <div>
          {isMine && (
            <MenuComment>
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
}

function MenuComment({ children }: MenuCommentProps) {
  return (
    <Menu withArrow shadow="md" width={200}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Comentário</Menu.Label>
        <Menu.Item icon={<IconEdit size={14} />}>Editar</Menu.Item>

        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Apagar
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
