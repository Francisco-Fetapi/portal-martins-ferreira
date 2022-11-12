import { useRouter } from "next/router";
import React from "react";
import AppScheme from "../../components/AppScheme";

export default function Noticia() {
  const router = useRouter();
  return (
    <AppScheme>
      <h1>Noticia</h1>
      <div>{router.query.id}</div>
    </AppScheme>
  );
}
