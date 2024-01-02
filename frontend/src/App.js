import React from 'react';
import { AuthProvider } from './AuthProvider';
import { createBrowserRouter, useRoutes, Router, RouterProvider } from 'react-router-dom';
import Navbar from './Login/Components/Navbar/Navbar';
import Register from './Login/Pages/Register';
import Login from './Login/Pages/Login';
import Home from './Login/Pages/Home';
import SingleUser from './Login/Pages/SingleUser';
import UpdateProfile from './Login/Pages/UpdateProfile';
import Delete from './Login/Pages/Delete';
import UnauthorizedPage from './UnauthorizedPage';

// Define your routes
const routes = createBrowserRouter([

  {
    path: '',
    element: <Home />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'user',
    element: <SingleUser />,



  },
  {
    path: 'user/update',
    element: <UpdateProfile />,
  },
  {
    path: 'user/delete',
    element: <Delete />,
  },
  // Catch-all route for handling errors, including 401 Unauthorized
  {
    path: '*',
    element: <UnauthorizedPage />,
  },
]);


function App() {
  const token = localStorage.getItem('token');

  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
