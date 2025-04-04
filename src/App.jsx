import { Routing } from './router/Routing';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme } from './themes';

// Crear un tema personalizado (opcional)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2' // Color principal
    },
    secondary: {
      main: '#dc004e' // Color secundario
    }
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Routing />
      </ThemeProvider>
    </>
  );
}

export default App;
