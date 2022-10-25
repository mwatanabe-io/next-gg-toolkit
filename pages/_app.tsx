import React from 'react'
import type { AppProps } from 'next/app'
import { store } from '../stores/store'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: 'h2',
            h2: 'h2',
            h3: 'h2',
            h4: 'h2',
            h5: 'h2',
            h6: 'h2',
            subtitle1: 'h2',
            subtitle2: 'h2',
            body1: 'span',
            body2: 'span',
          },
        },
      },
    },
  })
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
