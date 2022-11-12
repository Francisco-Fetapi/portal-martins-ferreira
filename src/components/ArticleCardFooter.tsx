import {
  createStyles,
  Tooltip,
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
import {
  IconHeart,
  IconThumbDown,
  IconBookmark,
  IconMessage,
  IconThumbUp,
  TablerIcon,
} from "@tabler/icons";
import { useRouter } from "next/router";
import dateDistance from "../helpers/dateDistance";
import useGlobalStyles from "../hooks/useGlobalStyles";

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
  long?: boolean;
  post: {
    id: number;
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

export function ArticleCardFooter({
  user,
  post,
  long,
}: ArticleCardFooterProps) {
  const { classes, theme } = useStyles();
  const router = useRouter();

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
      <Group spacing={10} my={3} mb={15}>
        <Text color="dimmed" size="xs">
          <Group spacing={1}>
            <IconThumbUp size={18} />
            <div>{post.likes} pessoas</div>
          </Group>
        </Text>
        <Text color="dimmed" size="xs">
          <Group spacing={1}>
            <IconThumbDown size={18} />
            <div>{post.disLikes} pessoas</div>
          </Group>
        </Text>
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

      <Group mt="lg">
        <Avatar src={user.image} radius="sm" />
        <div>
          <Text weight={500}>{user.name}</Text>
          <Text size="xs" color="dimmed">
            {dateDistance(post.created_at)}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            <Group spacing={1}>
              <IconMessage />
              <div>{post.comments} comentários</div>
            </Group>
          </Text>
          <Group spacing={10}>
            <PostIcon
              icon={
                <IconThumbUp
                  size={18}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              }
              title="gostar"
            />

            <PostIcon
              icon={
                <IconThumbDown
                  size={18}
                  color={theme.colors.cyan[6]}
                  stroke={1.5}
                />
              }
              title="não gostar"
            />
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
            <PostIcon
              icon={
                <IconBookmark
                  size={18}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              }
              title="guardar"
            />
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
}

function PostIcon({ icon, title, onClick }: PostIconProps) {
  const { classes } = useGlobalStyles();
  return (
    <Tooltip label={title}>
      <ActionIcon className={classes.background} onClick={onClick}>
        {icon}
      </ActionIcon>
    </Tooltip>
  );
}
