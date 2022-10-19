import { createStyles, SegmentedControl } from "@mantine/core";
import { IGenre } from "../interfaces/IUser";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    backgroundImage: theme.fn.gradient({
      from: theme.primaryColor,
      to: theme.black,
    }),
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));

interface InputGenreProps {
  genre: IGenre;
  setGenre: (value: IGenre) => void;
}

export function InputGenre({ genre, setGenre }: InputGenreProps) {
  const { classes } = useStyles();
  const options = {
    m: "Masculino",
    f: "Feminino",
  };

  console.log(genre, options[genre]);

  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={Object.values(options)}
      classNames={classes}
      value={options[genre]}
      onChange={(value) => setGenre(value === "Masculino" ? "m" : "f")}
    />
  );
}
