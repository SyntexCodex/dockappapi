
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import CertsRemainders from './Pages/Certs-reminders';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      
      <Route path='/' element={<Dashboard />} />
      <Route path='/certs-and-remainders' element={<CertsRemainders />} />
      </Routes>
     
        
    
    </BrowserRouter>
     
    </div>
    </ThemeProvider>
  );
}

export default App;
