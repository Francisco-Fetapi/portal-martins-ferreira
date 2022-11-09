import { createGlobalStyle } from "styled-components";

interface StylesProps {
  mode: "light" | "dark";
}

export const GlobalStyles = createGlobalStyle<StylesProps>`
    .page-container{
      width: 99%; 
      max-width: 500px;
    }
`;
