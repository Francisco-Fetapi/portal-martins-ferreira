import { useRouter } from "next/router";
import React from "react";
import AppScheme from "../../../components/AppScheme";

export default function Noticia() {
  const router = useRouter();
  const postId = router.query.id;
  return (
    <AppScheme>
      <h1>{postId}</h1>
    </AppScheme>
  );
}
