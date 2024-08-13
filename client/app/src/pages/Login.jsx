import React, { useReducer, useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthData } from '../auth/AuthWrapper';


const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthData();
  const [formData, setFormData] = useReducer((formData, newItem) => { return ( { ...formData, ...newItem } ) }, {username: '', password: ''});
  const [errorMessage, setErrorMessage] = useState(null);
  const doLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      navigate('/dashboard');
    } catch (error) {
      const { status, message } = error
      console.log({status, message});
      setErrorMessage(message);
    }
  }

  const inputClasses = 'block py-2 px-4 text-gray-600 bg-gray-100 border border-gray-200 text-sm mb-4 rounded-sm focus:outline-blue-400 w-full';
  return (
    <div className='bg-neutral-100 p-6 flex-1'>
      <div className='bg-white overflow-auto max-w-md mx-auto p-8 text-center rounded-lg border border-neutral-200'>
        <h1 className='mb-6 text-2xl font-semibold'>Login Page</h1>
        <form onSubmit={doLogin}>
          <div className='mb-4'>
            <input 
              id='username' name='username' type='text' placeholder='username' required
              className={inputClasses}
              value={formData.username} onChange={(e) => setFormData({username: e.target.value})}
            />
            <input 
              id='password' name='password' type='password' placeholder='*********' required
              value={formData.password} 
              className={inputClasses}
              onChange={(e) => setFormData({password: e.target.value})}
            />
          </div>
          <Button type='submit' primary className='rounded-sm w-full mb-3'>Log in</Button>
          <p className=''>
            <span>You don't have account? </span>
            <Link to='/register' className='text-blue-500 hover:underline'>Create account</Link>
          </p>
          
        </form>
        {errorMessage ? <div className='text-sm text-red-600 bg-red-100 border border-red-600 rounded-md p-1.5 w-full'>{errorMessage}</div> : null}
      </div>
    </div>
  )
}

export default Login