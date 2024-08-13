import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import { Navigate } from 'react-router-dom';
import Register from '../pages/Register';

export const nav = [
  { path: "/",          name: "Home",        element: <Navigate to='/dashboard' />,   isMenu: false,   isPrivate: true   },
  { path: "/dashboard", name: "Dashboard",   element: <Dashboard />,                  isMenu: true,    isPrivate: true   },
  { path: "/profile",   name: "Profile",     element: <Profile />,                    isMenu: true,    isPrivate: true   },
  { path: "/login",     name: "Login",       element: <Login />,                      isMenu: false,   isPrivate: false  },
  { path: "/register",  name: "Register",    element: <Register />,                   isMenu: false,   isPrivate: false  },
];