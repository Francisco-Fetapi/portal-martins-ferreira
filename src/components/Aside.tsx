import {
  MediaQuery,
  Aside as AsideMantine,
  Text,
  Title,
  ScrollArea,
  Box,
} from "@mantine/core";
import React from "react";
import FeaturedNew from "./FeaturedNew";

export default function Aside() {
  return (
    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
      <AsideMantine p="md" hiddenBreakpoint="md" width={{ lg: 300, sm: 250 }}>
        <Title order={3} mb={10}>
          Em Destaque
        </Title>
        <ScrollArea>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Box key={item} mb={10}>
            <FeaturedNew
              
              title={`Titulo da Noticia ${item + 1}`}
              time={`há ${item + 2} horas`}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
              assumenda est libero facere eveniet, modi, dolore voluptatem vel
              fugiat adipisci cupiditate obcaecati molestias illo vero aliquam
              laudantium culpa quo quidem.
            </FeaturedNew>
            </Box>
          ))}
        </ScrollArea>
      </AsideMantine>
    </MediaQuery>
  );
}
