import {
  Center,
  Footer as FooterMantine,
  Group,
  MediaQuery,
  Text,
  Breadcrumbs,
} from "@mantine/core";
import Link from "next/link";

export default function Footer() {
  const copyrights = (
    <Text size="xs">
      Colégio Obadias Malaquias - &copy; Todos os direitos reservados
    </Text>
  );

  return (
    <FooterMantine height={60} p="md">
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Center>{copyrights}</Center>
      </MediaQuery>
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Group
          sx={{
            justifyContent: "space-between",
          }}
        >
          {copyrights}
          <Group>
            <Breadcrumbs>
              <FooterLink href="/">Politicas de Privacidade</FooterLink>
              <FooterLink href="/">Termos e Condições</FooterLink>
              <FooterLink href="/">Quem somos</FooterLink>
            </Breadcrumbs>
          </Group>
        </Group>
      </MediaQuery>
    </FooterMantine>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link href={href}>
      <Text variant="link" size="sm" style={{ cursor: "pointer" }}>
        {children}
      </Text>
    </Link>
  );
}
