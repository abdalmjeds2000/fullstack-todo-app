import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthWrapper } from './auth/AuthWrapper';

function App() {
  
  return (
    <BrowserRouter>
      <div className='app-container bg-gray-100'>
        <AuthWrapper />
      </div>
    </BrowserRouter>
  )
}

export default App
