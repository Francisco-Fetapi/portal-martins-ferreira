import React from "react";
import Footer from "./Footer";
import { AppShell } from "@mantine/core";

interface AppSchemeSimpleProps {
  children: React.ReactNode;
}

export default function AppSchemeSimple({ children }: AppSchemeSimpleProps) {
  return <AppShell footer={<Footer />}>{children}</AppShell>;
}
