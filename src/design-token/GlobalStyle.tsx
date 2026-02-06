import { Global, css } from '@emotion/react';

const style = css`
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.3.9/dist/web/variable/PretendardVariable.woff2')
    format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}


  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    border: 0;
    outline: unset;
    list-style: none;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight:  500;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  html,
  body {
    overflow-x: hidden;
  }

  label {
    cursor: pointer;
    background-color: transparent;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

export const GlobalStyle = () => {
  return <Global styles={style} />;
};
