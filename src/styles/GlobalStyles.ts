import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    min-height: 100%;
    background: var(--background);
  }

  *, button, input {
    border: 0;
    background: none;
    font-family: 'Nunito', sans-serif;
    font-size: 17px;
  }

  body {
    color: var(--primary);
  }

  ul {
    list-style: none;
  }
  
  button {
    cursor: pointer;
  }

  :root {
    ${props => {
      const { theme } = props;

      let append = '';

      Object.entries(theme).forEach(([prop, value]) => {
        append += `--${prop}: ${value};`;
      });

      return append;
    }}
  }
`;
