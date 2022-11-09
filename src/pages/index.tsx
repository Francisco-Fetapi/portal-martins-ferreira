import { Center } from "@mantine/core";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { selectSignupData } from "../store/App.selectors";

export default function IndexPage() {
  const signupData = useSelector(selectSignupData);
  console.log(signupData);
  return (
    <Center sx={{ minHeight: "100vh" }}>
      <Header />
      <Footer />
    </Center>
  );
}
