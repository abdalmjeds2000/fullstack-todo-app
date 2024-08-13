import React, { useEffect, useReducer, useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthData } from '../auth/AuthWrapper';
import Input from '../components/Input';
import Select from '../components/SelectInput';


const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [countries, setCountries] = useState([]);
  const { register } = AuthData();

  const fetchCountries = async () => {
    const response = await fetch('https://api.sampleapis.com/countries/countries');
    const data = await response.json();
    const result = data.map(c => ({ value: c.name, label: c.name }));
    setCountries(result);
  }

  const doRegister = async (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const username = e.target.username.value;
    const mail = e.target.mail.value;
    const age = e.target.age.value;
    const phone = e.target.phone.value;
    const country = e.target.country.value;
    const password = e.target.password.value;
    const repassword = e.target.repassword.value;

    if (password !== repassword) {
      return setErrorMessage('Passwords do not match');
    }

    try {
      await register( fullname, username, mail, age, phone, country, password, repassword );
      navigate('/login');
    } catch (error) {
      const { status, message } = error;
      setErrorMessage(message);
    }
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className='bg-neutral-100 p-6 flex-1'>
      <div className='bg-white overflow-auto max-w-md mx-auto p-8 text-center rounded-lg border border-neutral-200'>
        <h1 className='mb-6 text-2xl font-semibold'>Login Page</h1>
        <form onSubmit={doRegister} className='flex flex-col gap-4'>
          <Input id='fullname' name='fullname' type='text' placeholder='Full Name' required />
          <Input id='username' name='username' type='text' placeholder='Username' required />
          <Input id='mail' name='mail' type='email' placeholder='Email' required />
          <Input id='age' name='age' type='number' placeholder='Age' required />
          <Input id='phone' name='phone' type='number' placeholder='Phone' required />
          <Select id='country' name='country' label='Country' required>
            <option value=''>Select Country</option>
            {
              countries.map(country => <option key={country.value} value={country.value}>{country.label}</option>)
            }
          </Select>
          <Input id='password' name='password' type='password' placeholder='Password' required />
          <Input id='repassword' name='repassword' type='password' placeholder='Re-Password' required />
          
          <Button type='submit' primary className='rounded-sm w-full mb-3'>Create account</Button>
          <p className=''>
            <span>You have account? </span>
            <Link to='/login' className='text-blue-500 hover:underline'>Log in</Link>
          </p>
          
        </form>
        {errorMessage ? <div className='text-sm text-red-600 bg-red-100 border border-red-600 rounded-md p-1.5 w-full'>{errorMessage}</div> : null}
      </div>
    </div>
  )
}

export default Register