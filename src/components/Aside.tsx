import { MediaQuery, Aside as AsideMantine, Text } from "@mantine/core";
import React from "react";

export default function Aside() {
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <AsideMantine p="md" hiddenBreakpoint="sm" width={{ lg: 300, base: 250 }}>
        <Text>Conteúdo secundário</Text>
      </AsideMantine>
    </MediaQuery>
  );
}
