import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './features/login/login';
import Register from './features/register/register';
import HomePage from './features/home/homepage';
import LoginGuard from './shared/guards/loginguards';

 // ✅ Import correctly

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginGuard><Login /></LoginGuard>} />
       <Route path="/login" element={<Login />} />
      <Route path="/register" element={<LoginGuard><Register /></LoginGuard>} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
