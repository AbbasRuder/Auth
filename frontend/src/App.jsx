import React from 'react'
import { IoMdLogOut } from "react-icons/io";
import { Outlet, useNavigate } from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from './slices/usersApiSlice'
import { deleteCredentials } from './slices/authSlice';
import { toast } from 'react-toastify';



export default function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap()
      dispatch(deleteCredentials())
      toast.success("Logout successful")
      navigate('/login')
    } catch (error) {
      toast.error(error.data.message || "Logout failed")
    }
  }

  return (
    <div>
      <nav className='w-full h-12 sm:h-16 px-8 flex items-center justify-between bg-slate-300'>
        <div className='text-white font-bold'>
          <p className='sm:text-lg md:text-xl text-blue-700'>Auth</p>
        </div>
        {userInfo &&
          <div className='flex items-center gap-2 px-2 py-1 rounded text-white bg-blue-800 cursor-pointer' onClick={handleLogout}>
            <IoMdLogOut className='rotate-180 w-4 sm:w-5 sm:h-5' />
            <span className='text-xs sm:text-lg'>Logout</span>
          </div>
        }
      </nav>
      <Outlet />
    </div>
  )
}
