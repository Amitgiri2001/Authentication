import React from 'react';
import { AuthProvider } from './AuthProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Login/Components/Navbar/Navbar';
import Register from './Login/Pages/Register';
import Login from './Login/Pages/Login';
import Home from './Login/Pages/Home';
import SingleUser from './Login/Pages/SingleUser';
import UpdateProfile from './Login/Pages/UpdateProfile';
import Delete from './Login/Pages/Delete';
import UnauthorizedPage from './UnauthorizedPage';

function App() {
  const token = localStorage.getItem('token');
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="user" element={token ? <SingleUser /> : <UnauthorizedPage />} />
          <Route path="user/update" element={token ? <UpdateProfile /> : <UnauthorizedPage />} />
          <Route path="user/delete" element={token ? <Delete /> : <UnauthorizedPage />} />

          {/* Catch-all route for handling errors, including 401 Unauthorized */}
          <Route path="*" element={<UnauthorizedPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
