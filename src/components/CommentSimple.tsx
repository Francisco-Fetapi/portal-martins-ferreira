import {
  createStyles,
  Text,
  Avatar,
  Group,
  ActionIcon,
  Button,
} from "@mantine/core";
import { IconThumbUp, IconThumbDown } from "@tabler/icons";
import dateDistance from "../helpers/dateDistance";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.xs,
  },
}));

interface CommentSimpleProps {
  created_at: Date;
  body: string;
  likes: number;
  liked: boolean;
  dislikes: number;
  disliked: boolean;
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
}: CommentSimpleProps) {
  const { classes } = useStyles();
  return (
    <div>
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
            // rightIcon={<>{likes}</>}
          >
            {likes}
          </Button>
          {/* {liked ? "gostei" : "gostar"} */}
          <Button
            color={disliked ? "red" : "gray"}
            size="xs"
            variant="light"
            leftIcon={<IconThumbDown size={15} />}
          >
            {dislikes}
          </Button>
          {/* {disliked ? "não gostei" : "não gostar"} */}
        </Group>
      </div>
    </div>
  );
}
