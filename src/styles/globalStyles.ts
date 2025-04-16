import { css } from '@emotion/react';

export const globalStyles = css`
  :root {
    --primary-color: #2F1893;
    --secondary-color: #E93A7D;
    --text-color: #1E0E62;
    --input-color: #EBEAED;
    --twitter-blue: #1DA1F2;
    font-size: 16px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'DM Sans', sans-serif;
  }

  body {
    background-color: var(--primary-color);
    overflow-x: hidden;
    margin: 0;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }
`; 