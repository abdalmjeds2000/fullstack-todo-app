import React, { useEffect, useState } from 'react'
import { AuthData } from '../auth/AuthWrapper';
import Button from './Button';
import { MdOutlineLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';

const UserControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = AuthData();


  return (
    <div className='relative'>
      <img 
        className='w-10 h-10 rounded-full hover:shadow-md cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
        src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' />

        {isOpen && <div className='w-64 p-4 bg-gray-100 border border-gray-300 shadow-sm absolute top-16 right-0 z-50 rounded-md'>
          
          <div className='mb-4'>
            <img 
              className='w-24 h-24 mb-4 border-4 border-gray-300 rounded-full'
              src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' />
            <Link to='/profile' replace={false} onClick={() => setIsOpen(false)}>
              <h2 className='font-semibold text-xl'>{user?.user?.fullname}</h2>
            </Link>
            <p className='text-sm text-gray-400'>{user?.user?.email}</p>
          </div>
          
          
          <div className='mt-6 flex justify-end'>
            <Link to='/login'>
              <Button danger onClick={logout}>
                <MdOutlineLogout />
              </Button>
            </Link>
          </div>

        </div>}
    </div>
  )
}

export default UserControls