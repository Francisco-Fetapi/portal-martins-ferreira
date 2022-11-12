import { createStyles, Avatar, Text, Group } from "@mantine/core";
import {
  IconPhoneCall,
  IconAt,
  IconCalendar,
  IconGenderMale,
  IconDoorEnter,
  IconRating12Plus,
} from "@tabler/icons";
import { IUser } from "../interfaces/IUser";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {},
}));

interface UserInfoIconsProps {
  user: Partial<IUser>;
}

export function UserInfo({ user }: UserInfoIconsProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group
        noWrap
        sx={{
          alignItems: "flex-start",
        }}
      >
        <Avatar src={user.photo} size={94} radius="md" />
        <div>
          <Text
            size="xs"
            sx={{ textTransform: "uppercase" }}
            weight={700}
            color="dimmed"
          >
            {user.myCourse}
          </Text>

          <Text size="lg" weight={500} className={classes.name}>
            {user.name}
          </Text>

          <UserGroupInfo
            item1={{
              icon: <IconAt stroke={1.5} size={16} className={classes.icon} />,
              text: user.email,
            }}
            item2={{
              icon: (
                <IconPhoneCall
                  stroke={1.5}
                  size={16}
                  className={classes.icon}
                />
              ),
              text: user.phoneNumber,
            }}
          />
          <UserGroupInfo
            item1={{
              icon: (
                <IconCalendar stroke={1.5} size={16} className={classes.icon} />
              ),
              text: user.birthday,
            }}
            item2={{
              icon: (
                <IconGenderMale
                  stroke={1.5}
                  size={16}
                  className={classes.icon}
                />
              ),
              text: user.genre === "m" ? "Masculino" : "Feminino",
            }}
          />
          <UserGroupInfo
            item1={{
              icon: (
                <IconDoorEnter
                  stroke={1.5}
                  size={16}
                  className={classes.icon}
                />
              ),
              text: user.myClass,
            }}
            item2={{
              icon: (
                <IconRating12Plus
                  stroke={1.5}
                  size={16}
                  className={classes.icon}
                />
              ),
              text: `${user.myGlade}ª classe`,
            }}
          />
        </div>
      </Group>
    </div>
  );
}

interface ItemProps {
  icon: React.ReactNode;
  text: React.ReactNode;
}
interface UserGroupInfoProps {
  item1: ItemProps;
  item2: ItemProps;
}

function UserGroupInfo({ item1, item2 }: UserGroupInfoProps) {
  return (
    <Group
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <Group noWrap spacing={10} mt={3}>
        {item1.icon}
        {/*  */}
        <Text size="xs" color="dimmed">
          {item1.text}
        </Text>
      </Group>

      <Group noWrap spacing={10} mt={5}>
        {item2.icon}
        <Text size="xs" color="dimmed">
          {item2.text}
        </Text>
      </Group>
    </Group>
  );
}
