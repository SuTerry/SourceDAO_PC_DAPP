
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      main: '#000000'
    }
  },
  typography: {
    fontFamily: [
      'Space Grotesk',
      'Hiragino Sans GB'
    ].join(','),
    body1: {
      // lineHeight: 2,
    }
  }
})