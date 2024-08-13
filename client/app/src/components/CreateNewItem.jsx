import React, { useReducer, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import SelectInput from './SelectInput';
import { FiPlusSquare } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import { AppData } from '../auth/AuthWrapper';

const CreateNewItem = ({ label, onAddNewTask }) => {
  const [formData, setFormData] = useReducer((formData, newItem) => { return ( { ...formData, ...newItem } ) }, {Title: '', Description: '', Priority: ''});
  const [isOpen, setIsOpen] = useState(false);
  const  { createTask } = AppData();

  const doSubmit = async () => {
    let error;
    Object.values(formData).forEach(value => {
      if(!value || value === '') {
        error = true;
        return;
      };
    });

    if(error) {
      toast.error('Fill Required Fields', {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
      return;
    };
    const data = await createTask(formData);
    if(onAddNewTask) onAddNewTask(data);
    setFormData({Title: '', Description: '', Priority: ''});
    setIsOpen(false);
  }

  const form = (
    <div id='add-new-task-form' className='flex flex-col gap-4'>
      <Input 
        id='new-task-title' name='task-title' type='text' placeholder='Title' required
        value={formData.Title} onChange={(e) => setFormData({Title: e.target.value})}
      />
      <Textarea
        id='new-task-title' name='task-title' type='text' placeholder='description' required maxLength={1000}
        value={formData.Description} onChange={(e) => setFormData({Description: e.target.value})}
      />
      <SelectInput value={formData.Priority} onChange={(e) => setFormData({Priority: e.target.value})} required>
        <option value={''}>Select Priority</option>
        <option value={1}>Low</option>
        <option value={2}>Medium</option>
        <option value={3}>High</option>
      </SelectInput>
    </div>
  )
  return (
    <>
      <Button primary onClick={() => setIsOpen(true)}><FiPlusSquare /> {label}</Button>
      {isOpen && 
        <Modal 
          title='Create New Task' 
          isOpen={isOpen} setIsOpen={setIsOpen}
          actionBar={<Button success onClick={doSubmit} className='mt-4 mb-2'><FiPlusSquare /> Add</Button>}
        >
          {form}
        </Modal>}
    </>
  )
}

export default CreateNewItem