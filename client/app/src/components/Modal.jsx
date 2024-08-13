import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { RiCloseLine } from "react-icons/ri";
import Button from './Button';

const Modal = ({ title, isOpen, setIsOpen, width, actionBar, children }) => {

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen])
  
  return ReactDOM.createPortal(
    <div>
      <div className='fixed inset-0 bg-gray-500 opacity-70' onClick={() => setIsOpen(false)} />
      <div className={`fixed ${width ? `max-w-[${width}]` : 'max-w-2xl'} mx-auto max-h-[1000px] inset-x-72 max-xl:inset-x-32 max-lg:inset-x-24 max-md:inset-x-6 inset-y-28 max-lg:inset-y-2 p-10 max-md:p-4 rounded-sm bg-white overflow-auto`}>
        <div className='flex flex-col justify-between h-full'>
          <div>
            <div className='flex items-center justify-between border-b border-gray-100 mb-6 pb-2'>
              {title ? <h1 className='font-semibold text-xl'>{title}</h1> : null}
              <Button secondary rounded className='p-0.5 opacity-20 hover:opacity-100' onClick={() => setIsOpen(false)}><RiCloseLine /></Button>
            </div>
            {children}
          </div>

          <div className='flex justify-end'>
            {actionBar}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}



export default Modal