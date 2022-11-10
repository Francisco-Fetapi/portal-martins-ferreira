import { MediaQuery, Aside as AsideMantine, Text } from "@mantine/core";
import React from "react";

export default function Aside() {
  return (
    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
      <AsideMantine p="md" hiddenBreakpoint="md" width={{ lg: 300, sm: 250 }}>
        <Text>Conteúdo secundário</Text>
      </AsideMantine>
    </MediaQuery>
  );
}
