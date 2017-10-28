
import { createMuiTheme } from 'material-ui/styles'
import { red, orange } from 'material-ui/colors'
import { primaryColor } from './color'

export const mainTheme = createMuiTheme({
  palette: {
    primary:  {...red, 500: primaryColor },
    secondary: orange,
    error: red,
  },
})