
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import CertsRemainders from './Pages/Certs-reminders';
import Navbar from './components/Navbar';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/certs-and-remainders' element={<CertsRemainders />} />
      </Routes>
     
        
    
    </BrowserRouter>
     
    </div>
  );
}

export default App;
