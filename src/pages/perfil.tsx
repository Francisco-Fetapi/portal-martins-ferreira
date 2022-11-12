import AppScheme from "../components/AppScheme";
import { UserInfo } from "../components/UserInfo";

export default function IndexPage() {
  return (
    <AppScheme>
      <UserInfo
        user={{
          name: "Nome do Usuario",
          phoneNumber: 934312217,
          photo: "/user.jpg",
          email: "emaildousuario@gmail.com",
          genre: "m",
          myCourse: "Nome do Curso",
          birthday: new Date().toLocaleDateString(),
          myGlade: 12,
          myClass: "Turma 2",
        }}
      />
    </AppScheme>
  );
}
