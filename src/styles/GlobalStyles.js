import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
	--color-primary: #55409f;
	--color-shadow: #6f5dad;
	--color-text: #8879bc;
  --color-text-light: #eeecf5;
	--color-ranking: #dbac34;
	--color-noanswer: #33265f;
	--color-error: #ae1e1e;
	--color-input-error: #fbe5e5;
	--color-error-outline: rgba(251, 229, 229, 0.5)
	--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
	--backdrop-color: rgba(255, 255, 255, 0.1);
}

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

html {
	font-size: 62.5%;
	overflow-x: hidden;
}

body {
	font-family: 'Schibsted Grotesk', sans-serif;
	font-weight: 400;
	font-size: 1.8rem;
	color: var(--color-primary);
	position: relative;
	overflow-x: hidden;
}

*:disabled {
  cursor: not-allowed;
}

@font-face {
    font-family: 'Betclic-Italic';
    src: url('/fonts/WOFF2/Betclic-Italic.woff2') format('woff2');
    font-style: normal;
    font-weight: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Betclic-Regular';
    src: url('/fonts/WOFF2/Betclic-Regular.woff2') format('woff2');
    font-style: normal;
    font-weight: normal;
    font-display: swap;
}

a {
	color: inherit;
  text-decoration: none;
}

p {
	color: var(--color-priamry);
}

ul {
  list-style: none;
}

button {
  font-family: inherit;
}

h1, h2, h3 {
	font-weight: 800;
	letter-spacing: -1.5px
} 

h1 {
  font-size: 8rem;
}

h2 {
  font-size: 6.4rem;
}

h3 {
  font-size: 4.8rem;

}

@media (max-width: 75em) {
  html {
    font-size: 56.25%;
  }

	h1 {
		font-size: 6.4rem;
	}

	h2 {
    font-size: 4.8rem;
  }

  h3 {
    font-size: 3.2rem;
  }
}


`;

export default GlobalStyles;
