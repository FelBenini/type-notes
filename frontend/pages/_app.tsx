import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif"
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#d571e3',
    },
    secondary: {
      main: '#A121BE',
    },
    warning: {
      main: '#D81E5B',
    },
    success: {
      main: '#78FECF'
    }
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <section id='bodySectionPaddingHeader'>
        <Component {...pageProps} />
      </section>
    </ThemeProvider>)
}
