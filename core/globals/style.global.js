import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  :root{
    --black: #000;
    --white: #fff;

    --primary: #5458ae;
    --primary-hover: #019376;
    --primary-alt: #028489;
    --primary-light: #b7dbdd;

    --secondary: #EE736E;
    --secondary-hover: #FF282F;
    --secondary-alt: #fc5c63;

    --gray100: #f9f9f9;
    --gray200: #F7F7F7;
    --gray300: #f4f4f4;
    --gray400: #F3F3F3;
    --gray500: #f1f1f1; 
    --gray600: #EdEdEd;
    --gray700: #E6E6E6; 
    --gray800: #C2C3CC;
    --gray900: #bdbdbd;

    --text-bold: #0D1136;
    --text-medium: #424561;
    --text-regular: #77798C;
    --text-light: #909090;
    --text-label: #767676;

    --text-black: #20114D;

    --font-xs: 12px;
    --font-xxs: 11px;
    --font-sm: 13px;
    --font-base: 15px;
    --font-md: 19px;
    --font-lg: 21px;
    --font-xl: 24px;
    --font-2xl: 30px;
    --font-3xl: 36px;
    --font-4xl: 42px;
    --font-5xl: 48px;
    --br: 6px;
    --gap: 10px;
    --gap-md: 15px;
    --gap-xl: 20px;
    --gap-2xl: 40px;
    --ff-body: Lato, sans-serif;
    --ff-heading: Poppins, sans-serif;
    --ff-monospace: Menlo, monospace;

    --shadow-base: 0 3px 6px rgba(0, 0, 0, 0.16);
    --shadow-medium: 0 6px 12px rgba(0, 0, 0, 0.16);
    --shadow-big: 0 21px 36px rgba(0, 0, 0, 0.16);
    --shadow-light: 0 21px 36px rgba(0, 0, 0, 0.05);
    --shadow-header: 0 1px 2px rgba(0, 0, 0, 0.06);
    --shadow-figma: 0px 4px 10px rgba(0, 0, 0, 0.25);
    
    --mobile: 767px;
    --tab: 998px;
    --tsn: 0.2s ease-in-out;
  }
  h1,h2,h3,h4,h5,h6{
    font-family: Poppins, "sans-serif";
    margin: 0;
  }
  body{
    margin: 0;
    font-family: Montserrat, "sans-serif";
    font-weight: regular;
    background: #fff;
  }
  p,span,button,li,div{
       font-family: Montserrat, "sans-serif";
       margin: 0;
  }
  a {
      font-family: Montserrat, "sans-serif";
      text-decoration: "none";
  }
  .wrap{
    width: 95%;
    margin: auto;
  }
  .fade__in__animation{
    animation: fadeIn ease-out .3s;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }


  .container{
      width: 1024px;
      max-width: 90%;
      margin: auto;
  }

  .flex{
      display: flex;
      &.jcsb{
          justify-content: space-between;
      }
      &.ci{
          align-items: center;
      }
      &.jcc{
          justify-content: center;
      }
  }
`;

export default GlobalStyle;
