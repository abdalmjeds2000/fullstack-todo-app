import React from 'react';
import { AuthData } from '../auth/AuthWrapper';
import Tag from '../components/Tag';
import { BsFillArrowUpRightCircleFill, BsFillArrowDownRightCircleFill } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';
import { BiTask, BiTaskX } from 'react-icons/bi';
import CreateNewItem from '../components/CreateNewItem';


const sectionClasses = 'bg-white p-6 rounded-lg shadow-sm';


const UserInfo = ({ label, value }) => (
  <div className='bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl'>
    {label ? <p className='text-gray-300 text-sm leading-5'>{label}</p> : null}
    <p className='text-sm'>{value || '...'}</p>
  </div>
)
const UserStat = ({ title, value, desc, color, icon: Icon }) => (
  <div className={`${sectionClasses} flex-1 flex border-b-4 border-${color}`}>
    <div className='flex-1'>
      <h1 className={`text-4xl font-semibold text-${color}`}>{value}</h1>
      <p className='text-gray-400 text-md mb-1'>{title}</p>
      <div>{desc}</div>
    </div>
    <div className='relative'>
      <Icon className={`text-7xl opacity-10 text-${color} `} />
    </div>
  </div>
);
const Profile = () => {
  const { user } = AuthData();


  const userStats = [
    { 
      _id: 1,
      value: 26, title: 'Pending', increasePerc: 0.25, color: 'yellow-500',
      icon: MdOutlinePendingActions,
      lastDays: [
        {date: '2023-05-01', value: 3},
        {date: '2023-05-02', value: 4},
        {date: '2023-05-03', value: 2},
        {date: '2023-05-04', value: 5},
        {date: '2023-05-05', value: 3},
      ]
    },{ 
      _id: 2,
      value: 62, title: 'Completed', increasePerc: 0.34, color: 'green-500',
      icon: BiTask,
      lastDays: [
        {date: '2023-05-01', value: 3},
        {date: '2023-05-02', value: 4},
        {date: '2023-05-03', value: 2},
        {date: '2023-05-04', value: 5},
        {date: '2023-05-05', value: 3},
      ]
    },{ 
      _id: 3,
      value: 5, title: 'Cancelled', increasePerc: 0.15, color: 'red-500',
      icon: BiTaskX,
      lastDays: [
        {date: '2023-05-01', value: 0},
        {date: '2023-05-02', value: 2},
        {date: '2023-05-03', value: 1},
        {date: '2023-05-04', value: 0},
        {date: '2023-05-05', value: 2},
      ]
    },
  ];

  return (
    <div className='container px-6 py-8 mx-auto flex max-md:flex-col gap-6'>
      <div className={`flex-1 ${sectionClasses} flex flex-col items-center`}>
        <img 
          className='w-28 h-28 mb-3 border-4 border-gray-200 rounded-full'
          src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' />

        <h2 className='font-semibold text-2xl mb-2'>{user?.user?.fullname}</h2>
        <Tag status='info' className='block w-fit mx-auto mb-6'>@{user?.user?.username}</Tag>
        <div className='mb-6'>
          <CreateNewItem label='Create New Task' />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <UserInfo label='Country' value={user?.user?.country} />
          <UserInfo label='Email' value={user?.user?.email} />
          <UserInfo label='Phone' value={user?.user?.phone} />
        </div>
      </div>

      <div className='flex-[2] flex flex-col gap-6'>
        <div className='flex gap-6 flex-wrap max-sm:flex-col'>
          {userStats.map((stat, i) => (
            <UserStat
              key={stat._id}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              icon={stat.icon}
              desc={
                <div className='flex gap-1 items-center text-gray-400'>
                  <span>{stat.increasePerc > 0 ? <BsFillArrowUpRightCircleFill/> : <BsFillArrowDownRightCircleFill/>}</span>
                  <span>{stat.increasePerc*100} %</span>
                </div>
              }
            />
          ))}
        </div>

        <div className={sectionClasses}>
          section
        </div>
      </div>
    </div>
  )
}

export default Profile