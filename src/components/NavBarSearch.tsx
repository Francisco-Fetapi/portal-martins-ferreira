import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

import { useForm } from "@mantine/form";

export default function NavBarSearch() {
  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  function handleSubmit(values: typeof form.values) {
    if (values.search) {
      console.log(values);
    }
  }

  return (
    <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        placeholder="Procurar noticias"
        size="xs"
        icon={<IconSearch size={12} stroke={1.5} />}
        rightSectionWidth={70}
        mb="sm"
        {...form.getInputProps("search")}
      />
    </form>
  );
}
