import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/theme/globalStyle';
import theme from '@/theme';
import '../../public/font/static/style.css';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const DEFAULT_SEO = {
    title: 'Markdown Table',
    description: 'Generate markdown table easily',
    canonical: 'https://www.jyangca.com',
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: 'Markdown Table',
      title: 'Markdown Table',
      site_name: 'Markdown Table',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <DefaultSeo {...DEFAULT_SEO} />
      <Head>
        <link rel="icon" type="image/png" href="https://icons-for-free.com/download-icon-markdown-1329858347762931910_512.png" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
