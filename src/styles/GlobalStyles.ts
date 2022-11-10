import { createGlobalStyle } from "styled-components";

interface StylesProps {
  mode: "light" | "dark";
}

export const GlobalStyles = createGlobalStyle<StylesProps>`
    .page-container{
      width: 99%; 
      max-width: 500px;
    }
    .show_short_and_view_more{
    text-overflow:ellipsis;
    overflow: hidden;
    /* max-width:320px; */
    white-space: nowrap;
    display:inline-block;
  }
`;
