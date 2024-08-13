import React, { useState } from 'react';
import moment from 'moment';
import Button from '../components/Button';
import SelectInput from '../components/SelectInput';
import Tag from '../components/Tag';
import CreateNewItem from '../components/CreateNewItem';
import { RiDeleteBinLine, RiCheckFill } from 'react-icons/ri';
import { AppData } from '../auth/AuthWrapper';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const TaskView = ({ _id, Title, Description, Priority, IsCompleted, CreatedAt, onDelete , onUpdate}) => {
  const { updateTask, deleteTask } = AppData();
  const _priority = Priority === 1 ? 'Low' : Priority === 2 ? 'Medium' : 'High';
  const _priorityStatus = Priority === 1 ? 'normal' : Priority === 2 ? 'info' : 'error';
  
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    if(onDelete) onDelete(id);
    toast.success('Task Deleted Successfully', {
      position: "bottom-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "colored",
    });
  }
  const handleUpdateTask = async (id) => {
    await updateTask(id, { IsCompleted: true });
    if(onUpdate) onUpdate(id, { IsCompleted: true });
    toast.success('Task Completed Successfully', {
      position: "bottom-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "colored",
    });
  }
  return (
    <div className={`bg-white shadow-lg rounded-md p-4 mb-4 border-l-4 ${IsCompleted ? 'border-teal-500' : 'border-orange-400'}`}>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <h1 className='text-2xl'>{Title}</h1>
          <span className='text-gray-500 font-semibold'><Tag status={_priorityStatus}>{_priority}</Tag></span>
        </div>
        <div className='flex gap-1 items-center'>
          {!IsCompleted && <Button success onClick={() => handleUpdateTask(_id)}><RiCheckFill /></Button>}
          <Button danger onClick={() => handleDeleteTask(_id)}>
            <RiDeleteBinLine />
          </Button>
        </div>
      </div>
      <p className='text-gray-500 mb-2'>{Description}</p>
      <p className='text-gray-500'>{moment(CreatedAt).format('MM/DD/YYYY hh:mm A')}</p>
    </div>
  )
}





const Dashboard = () => {
  const { getTasks } = AppData();
  const [filterBy, setfilterBy] = useState('all');
  const { isLoading, error, data, refetch } = useQuery('tasksData', async () => { return await getTasks(); });
  let filteredData = [];
  let pendingTasks = [];
  if(Array.isArray(data)) {
    filteredData = data?.filter(task => {
      if(filterBy === 'all') {
        return true;
      } else if(filterBy === 'pending') {
        return !task.IsCompleted;
      } else if(filterBy === 'completed') {
        return task.IsCompleted;
      } 
    });
    pendingTasks = data?.filter(item => !item.IsCompleted);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className='container mx-auto p-6'>
      <div className='flex gap-2 items-center justify-between flex-wrap my-8'>
        <h1 className='text-4xl'>
          You've got <span className='text-blue-500 font-semibold'>{pendingTasks?.length} tasks</span> in progress!
        </h1>
        <div className='flex items-center gap-2'>
          <CreateNewItem label='Create New Task' onAddNewTask={refetch} />
          <SelectInput value={filterBy} onChange={e => setfilterBy(e.target.value)} className>
            <option value='all'>All</option>
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
          </SelectInput>
        </div>
      </div>

      <div>
        <div>
          <h2 className='text-2xl mb-4 capitalize'>{filterBy}</h2>
          {
            filteredData?.map((item, index) => (
              <TaskView 
                key={index} 
                {...item} 
                onDelete={() => refetch()}
                onUpdate={() => refetch()}
              />
            ))
          }
          {(filteredData?.length === 0 && !error && !isLoading) && (
            <div className='bg-white shadow-lg shadow-[#00000008] rounded-md p-4 mb-4'>
              <p className='text-gray-500'>No tasks found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard