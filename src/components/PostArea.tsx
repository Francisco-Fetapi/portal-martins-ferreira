import { Anchor, FileButton, Textarea, Center, Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface PostAreaProps {
  buttonText?: string;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleSubmit: () => void;
  form: UseFormReturnType<{ content: string }>;
  isLoading: boolean;
}
// 2 componentes estao usando. Agnostico ao lugar que requisitado
// get the form returned by useForm
export default function PostArea({
  buttonText,
  file,
  setFile,
  handleSubmit,
  form,
  isLoading,
}: PostAreaProps) {
  return (
    <div>
      <Textarea
        label="Escreva alguma notícia"
        placeholder="O que tem a comunicar?"
        autosize
        minRows={4}
        maxRows={9}
        required
        description={
          <>
            A primeira linha da noticia será fixada como o titulo.
            <br /> Depois de publicada/editada, a noticia precisa da{" "}
            <b>aprovação do administrador.</b>
          </>
        }
        {...form.getInputProps("content")}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 5,
        }}
      >
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => (
            <Anchor size="xs" {...props}>
              {file ? "Alterar foto" : "Escolher foto"}
            </Anchor>
          )}
        </FileButton>
        {file && (
          <Anchor pl={10} size="xs" onClick={() => setFile(null)}>
            Cancelar
          </Anchor>
        )}
      </div>
      <Center mt={1}>
        <Button loading={isLoading} onClick={handleSubmit}>
          {buttonText || "Publicar"}
        </Button>
      </Center>
    </div>
  );
}
