import { Center } from "@mantine/core";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { selectUserData } from "../store/App.selectors";

export default function IndexPage() {
  const userData = useSelector(selectUserData);
  console.log("user", userData);
  return (
    <Center sx={{ minHeight: "100vh" }}>
      <Header />
      <Footer />
    </Center>
  );
}
