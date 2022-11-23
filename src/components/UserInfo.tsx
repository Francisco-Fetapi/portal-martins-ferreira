import {
  FileButton,
  createStyles,
  Avatar,
  Text,
  Group,
  Button,
} from "@mantine/core";
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
import usePhotoPreview from "../hooks/usePhotoPreview";
import { IUserContext, UserContext } from "../context/UserProvider";
import { useContext, useState, useEffect } from "react";
import { ApiUploadDataResponse } from "../api/interfaces";
import { strapi } from "../api/strapi";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

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

const emptyText = "Não informado";

export function UserInfo({ user, isMine }: UserInfoIconsProps) {
  const { classes } = useStyles();
  const DEFAULT_PHOTO = getPhoto(user.photo!, "medium");
  const { clearFile, file, photoSrc, resetRef, setFile } =
    usePhotoPreview(DEFAULT_PHOTO);
  const { setPhotoPreviewURL } = useContext(
    UserContext
  ) as Required<IUserContext>;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    clearFile();
  }, [DEFAULT_PHOTO]);

  async function changeProfilePhoto() {
    console.log("mudal foto de perfil.");
    if (file) {
      try {
        const form = new FormData();
        form.append("ref", "plugin::users-permissions.user");
        form.append("refId", String(user.id));
        form.append("field", "photo");
        form.append("files", file);
        setLoading(true);
        let { data: photosUploaded } = await strapi.post<
          ApiUploadDataResponse[]
        >("/upload", form);
        router.push("/perfil");
      } catch (e: any) {
        showNotification({
          title: "Erro ao alterar foto",
          message:
            "Houve um erro ao tentar alterar a sua foto de perfil. Tente mais tarde.",
          color: "red",
        });
      } finally {
        setLoading(false);
        try {
          await strapi.delete("/upload/files/" + user.photo?.id);
        } catch (e: any) {
          console.log("Erro ao apagar a foto antiga.");
        }
      }
    }
  }

  useEffect(() => {
    if (file) {
      setPhotoPreviewURL(photoSrc);
    } else {
      setPhotoPreviewURL("");
    }
  }, [photoSrc]);

  return (
    <div>
      <Group
        noWrap
        sx={{
          alignItems: "flex-start",
        }}
      >
        <Avatar src={photoSrc} size={94} radius="md" />
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
                text: user.phoneNumber || emptyText,
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
                text: user.myClass || emptyText,
              }}
              item2={{
                icon: (
                  <IconRating12Plus
                    stroke={1.5}
                    size={16}
                    className={classes.icon}
                  />
                ),
                text: user.myGlade ? `${user.myGlade}ª classe` : emptyText,
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

            {file ? (
              <>
                <Button
                  color="red"
                  size="xs"
                  variant="light"
                  onClick={clearFile}
                >
                  Limpar foto
                </Button>
                <Button
                  color="green"
                  size="xs"
                  variant="light"
                  onClick={changeProfilePhoto}
                  loading={loading}
                >
                  Concluido
                </Button>
              </>
            ) : (
              <FileButton
                //   resetRef={resetRef}
                onChange={setFile}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Button {...props} size="xs" variant="light">
                    Alterar Foto
                  </Button>
                )}
              </FileButton>
            )}
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
