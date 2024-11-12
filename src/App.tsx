import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


import AdminP from './admin/adminP';
import Footer from './Footer';
import UserP from './User/UserP';
import Login from './login/Login';
import Registrarse from './register/register';
import Home from './homeA';


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserP />} />
        <Route path="/register" element={<Registrarse />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;