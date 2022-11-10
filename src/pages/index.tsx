import { useState } from "react";
import {
  AppShell,
  ScrollArea,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            Os itens do menu
          </Navbar.Section>
          <Navbar.Section>
            <Text>Footer with user</Text>
          </Navbar.Section>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      <Text>
        <h3>Resize app to see responsive navbar in action</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
        tenetur sequi rem fugit pariatur consectetur, non accusamus in, vero hic
        molestias error ea quae! Illo optio doloribus a laudantium placeat.
        Dolorum cumque quaerat odio id distinctio perspiciatis eius modi
        repudiandae, tempore eum eaque soluta explicabo corporis natus obcaecati
        sed non. Modi quia optio sunt illo, obcaecati neque at nisi iure.
        Provident nihil cupiditate a exercitationem nemo inventore non
        architecto magnam, labore, excepturi explicabo quidem quia sequi
        corrupti, adipisci unde modi vel accusantium maiores voluptatem delectus
        dolorem sed nostrum. Placeat, ratione? Delectus perspiciatis recusandae
        et sed suscipit ullam adipisci voluptatum dolorum quia deserunt saepe
        placeat amet nulla sapiente veniam sint fugiat, explicabo aliquam
        voluptatibus nobis! Possimus accusantium fuga nesciunt cum magnam.
        Perspiciatis, dolorem harum optio sapiente ipsa repellendus natus
        impedit expedita porro, doloribus quasi? Omnis cum quisquam eligendi,
        reiciendis est aliquid iste quam placeat harum quaerat vitae voluptatem
        ipsa reprehenderit eaque. Esse, nemo! Doloribus corrupti non numquam
        fuga, sit recusandae voluptatibus deserunt quibusdam molestias facere
        itaque distinctio ipsa. Dicta nesciunt cumque a ducimus architecto!
        Explicabo, libero? Culpa debitis pariatur ut reiciendis. Iste natus
        maiores reiciendis, perspiciatis inventore culpa aspernatur ratione,
        assumenda veniam eum non quam sint ab nobis eveniet provident
        praesentium minus numquam facilis. Obcaecati blanditiis, neque quia
        aspernatur sint quos? Accusantium iusto eum rem incidunt eveniet,
        adipisci at eaque nostrum possimus voluptatum illo quo quod suscipit
        quia doloremque vitae cum sit quasi repellat facere, molestias ullam!
        Esse recusandae a vitae. Non ea corrupti in debitis hic rerum doloremque
        reiciendis soluta ad sint laborum excepturi eligendi, magni dolorem
        animi similique eum! Molestias aut sint perspiciatis accusantium nulla
        maiores eveniet quas eligendi? Suscipit consectetur facere inventore
        repellat minima porro! Accusantium esse illo cupiditate laborum
        asperiores non et doloremque deleniti sapiente vero, magni, excepturi
        at. Unde blanditiis rerum consequuntur laudantium beatae sint dolorum?
        Accusantium nulla eum inventore laborum quia earum hic praesentium,
        dicta, reiciendis temporibus iure magni consectetur! Aspernatur fuga
        ullam asperiores ducimus itaque accusamus id quod, voluptatibus,
        consequatur dolorum odit quas dicta! Incidunt odio perferendis
        cupiditate non accusantium! Maxime, adipisci incidunt, optio quas
        voluptatem reprehenderit quibusdam, ullam nemo distinctio quis dolorum
        beatae possimus! Explicabo voluptates nulla minus laudantium dolores
        deleniti, recusandae libero?
      </Text>
    </AppShell>
  );
}
