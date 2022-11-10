import { MediaQuery, Aside as AsideMantine, Text } from "@mantine/core";
import React from "react";

export default function Aside() {
  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <AsideMantine p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        <Text>Conteúdo secundário</Text>
      </AsideMantine>
    </MediaQuery>
  );
}
