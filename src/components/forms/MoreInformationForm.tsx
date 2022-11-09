import {
  TextInput,
  Paper,
  Title,
  Text,
  Button,
  Box,
  Center,
  Stack,
  Select,
  Radio,
  Container,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useValidateFunctions from "../../hooks/useValidateFunctions";
import { selectSignupData } from "../../store/App.selectors";
import { setSignUpData } from "../../store/App.store";
import FormHeader from "../FormHeader";

const courses = ["Curso1", "Curso2", "Curso3", "Curso4", "Curso5"];

export function MoreInformationForm() {
  const validate = useValidateFunctions();
  const formSigninData = useSelector(selectSignupData);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      myClass: "",
      myCourse: "",
      myGlade: 10,
      phoneNumber: "",
    },
    validate: {
      phoneNumber(value) {
        return validate.phoneNumber(value);
      },
      myClass(value) {
        return validate.myClass(value);
      },
    },
  });
  const router = useRouter();
  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    dispatch(
      setSignUpData({
        ...formSigninData,
        ...values,
      })
    );
    router.push("/criar-conta/foto-de-perfil");
  };

  return (
    <Stack my={50}>
      <FormHeader title="Mais Sobre Você">
        Adicione mais detalhes sobre o seu perfil para uma melhor experiência.
      </FormHeader>
      <Paper
        component="form"
        autoComplete="off"
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Stack style={{ flexDirection: "column" }}>
          <Title
            align="center"
            sx={() => ({
              fontWeight: 600,
              fontSize: 25,
            })}
            mb="md"
          >
            INFORMAÇÕES ADICIONAIS
          </Title>
          <TextInput
            type="number"
            label="Número de telefone"
            placeholder="+244 9xx-xxx-xxx"
            required
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            label="Minha turma/sala"
            placeholder="Turma 1, sala B...."
            {...form.getInputProps("myClass")}
            required
          />
          <Select
            style={{ zIndex: 2 }}
            data={courses}
            {...form.getInputProps("myCourse")}
            placeholder="Escolha um curso"
            label="Selecione seu curso"
            required
          />

          <Container my={10}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              {[10, 11, 12, 13].map((glade) => (
                <Radio
                  key={glade}
                  value={`${glade}`}
                  label={`${glade}ª classe`}
                  checked={glade == form.values.myGlade}
                  onChange={() => form.setFieldValue("myGlade", glade)}
                />
              ))}
            </div>
          </Container>

          <Center>
            <Button type="submit">Concluir</Button>
          </Center>
        </Stack>
      </Paper>
    </Stack>
  );
}