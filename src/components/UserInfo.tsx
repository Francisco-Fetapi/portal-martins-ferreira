import { createStyles, Avatar, Text, Group, Button } from "@mantine/core";
import {
  IconPhoneCall,
  IconAt,
  IconCalendar,
  IconGenderMale,
  IconDoorEnter,
  IconRating12Plus,
} from "@tabler/icons";
import { IUser, IUserLogged } from "../interfaces/IUser";
import Link from "next/link";
import getPhoto from "../helpers/getPhoto";

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
  user: Partial<IUserLogged>;
  isMine?: boolean;
}

export function UserInfo({ user, isMine }: UserInfoIconsProps) {
  const { classes } = useStyles();

  return (
    <div>
      <Group
        noWrap
        sx={{
          alignItems: "flex-start",
        }}
      >
        <Avatar src={getPhoto(user.photo!, "medium")} size={94} radius="md" />
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
            {user.username}
          </Text>

          <Group
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 10,
              rowGap: 5,
            }}
          >
            <UserGroupInfo
              item1={{
                icon: (
                  <IconAt stroke={1.5} size={16} className={classes.icon} />
                ),
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
                  <IconCalendar
                    stroke={1.5}
                    size={16}
                    className={classes.icon}
                  />
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
          </Group>
        </div>
      </Group>
      {isMine && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Group mt={20}>
            <Link href="/perfil/editar">
              <Button size="xs" variant="light">
                Editar Perfil
              </Button>
            </Link>
            <Button size="xs" variant="light">
              Alterar Foto
            </Button>
          </Group>
        </div>
      )}
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
    <>
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
    </>
  );
}
