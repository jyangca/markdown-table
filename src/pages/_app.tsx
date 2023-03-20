import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/theme/globalStyle';
import theme from '@/theme';
import '../../public/font/static/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <title>Markdown Table</title>
        <meta name="viewport" content="width=1920" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
