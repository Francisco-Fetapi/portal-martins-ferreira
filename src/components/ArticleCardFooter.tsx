import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Title,
  Avatar,
  Badge,
  Spoiler,
} from "@mantine/core";
import { IconHeart, IconBookmark, IconShare } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {},

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

interface ArticleCardFooterProps {
  post: {
    title: string;
    content: string;
    image?: string;
    created_at: Date;
    comments: number;
    likes: number;
    disLikes: number;
  };
  user: {
    name: string;
    image: string;
  };
}

export function ArticleCardFooter({ user, post }: ArticleCardFooterProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      {post.image && (
        <Card.Section mb="sm">
          <Image src={post.image} alt={post.title} height={250} />
        </Card.Section>
      )}

      <Title order={4} className={classes.title} mt="xs">
        {post.title}
      </Title>
      <Text>
        <Spoiler
          maxHeight={95}
          showLabel="Mostrar mais"
          hideLabel="Mostrar menos"
          transitionDuration={0}
        >
          {post.content}
        </Spoiler>
      </Text>

      <Group mt="lg">
        <Avatar src={user.image} radius="sm" />
        <div>
          <Text weight={500}>{user.name}</Text>
          <Text size="xs" color="dimmed">
            {post.created_at.toLocaleDateString()}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            {post.comments} comentários
          </Text>
          <Group spacing={0}>
            <ActionIcon>
              <IconHeart size={18} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon>
              <IconBookmark
                size={18}
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon>
              <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
