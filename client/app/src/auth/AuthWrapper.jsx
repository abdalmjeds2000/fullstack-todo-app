import { createContext, useContext, useEffect, useState } from 'react';
import { RenderMenu, RenderRoutes } from '../structure/RenderNavigation';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();
const apiUrl = 'http://localhost:3001';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ user: null, isAuthenticated: false });
  const navigate = useNavigate();

  const setAuthToken = (token) => {
    if(token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem('todo-app-token', token);
      setUser({ user: jwtDecode(token), isAuthenticated: true });
      return;
    }
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem('todo-app-token');
  }
  const login = (username, password) => {
    return new Promise(async ( resolve, reject ) => {
      const payload = { username, password };
      const response = await axios.post(`${apiUrl}/login`, payload);
      if(response.data.status === 'success') {
        const { token } = response.data;
        setAuthToken(token);
        resolve(response.data);
        
        toast.success(<span>Welcome back <b>{jwtDecode(token).username}</b></span>, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        reject(response.data);
      }
    })
  }

  const register = (fullname, username, mail, age, phone, country, password, repassword) => {
    return new Promise(async ( resolve, reject ) => {
      const payload = { fullname, username, mail, age, phone, country, password };
      const response = await axios.post(`${apiUrl}/register`, payload);
      if(response.data.status === 200) {
        resolve(response);
        toast.success(<span>Your account has been created successfully!</span>, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        reject(response);
      }
    })
  }

  const logout = () => {
    navigate('./');
    setUser({ user: {}, isAuthenticated: false });
    setAuthToken(false);
  }

  const getCurrentUser = () => {
    try {
      const token = localStorage.getItem('todo-app-token');
      return jwtDecode(token);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  useEffect(() => {
    const userLoggedIn = getCurrentUser();
    if(userLoggedIn) {
      const token = localStorage.getItem('todo-app-token');
      setAuthToken(token)
    }
  }, [])


  return (
    <AuthContext.Provider value={{user, register, login, logout, apiUrl}}>
      <AppWrapper />
    </AuthContext.Provider>
  )
}


const AppContext = createContext();
export const AppData = () => useContext(AppContext);

export const AppWrapper = () => {

  const getTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/todos`);
      return response.data;
    } catch (error) {
      return error
    }
  }

  const createTask = async (data) => {
    if(!data) {
      return new Error('No data provided');
    }
    try {
      const response = await axios.post(`${apiUrl}/todos`, data);
      return response.data;
    } catch (error) {
      return error
    }
  }

  const updateTask = async (id, data) => {
    if(!id || !data) {
      return new Error('No ID or data provided');
    }
    try {
      const response = await axios.put(`${apiUrl}/todos/${id}`, data);
      return response.data;
    } catch (error) {
      return error
    }
  }

  const deleteTask = async (id) => {
    if(!id) {
      return new Error('No ID provided');
    }
    try {
      const response = await axios.delete(`${apiUrl}/todos/${id}`);
      return response.data;
    } catch (error) {
      return error
    }
  }

  return (
    <AppContext.Provider value={{ getTasks, createTask, updateTask, deleteTask }}>
      <QueryClientProvider client={queryClient}>
        <div className='min-h-screen flex flex-col'>
          <RenderMenu />
          <RenderRoutes />
        </div>
        <ToastContainer />
      </QueryClientProvider>
    </AppContext.Provider>
  )
}