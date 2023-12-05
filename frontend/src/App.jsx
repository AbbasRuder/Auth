// -RRD
import { Outlet, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// -toastify
import { toast } from 'react-toastify';
// -RTK
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from './slices/usersApiSlice'
import { deleteCredentials } from './slices/authSlice';
// -icons
import { IoMdLogOut } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from 'react';


export default function App() {
  const [userModal, setUserModal] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const [logout] = useLogoutMutation()

  // -handle logout functionality
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

  // -handle the opening/closing of user modal
  const handleModal = () => {
    setUserModal((current) => !current)
  }

  return (
    <div className='h-screen'>
      <nav className='w-full h-12 sm:h-16 px-8 sm:px-14 flex items-center justify-between bg-gray-800'>
        <div className='text-white font-bold'>
          <p className='sm:text-lg md:text-xl text-white'>Auth</p>
        </div>
        
        {userInfo &&
          <>
            <div className='relative'>
              <FaCircleUser className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer bg-white rounded-full border' onClick={handleModal} />
              {
                userModal &&
                <div className='absolute right-0 mt-2 bg-gray-600 px-4 py-4 text-white rounded'>
                  <p className='text-sm sm:text-md opacity-60'>{userInfo.name}</p>

                  <div className='mt-2 flex items-center gap-2 px-2 py-1 rounded text-white bg-gray-800 cursor-pointer' onClick={handleLogout}>
                    <IoMdLogOut className='rotate-180 w-4 sm:w-5 sm:h-5' />
                    <span className='text-xs sm:text-lg'>Logout</span>
                  </div>
                </div>
              }
            </div>
          </>
        }
      </nav>
      <Outlet />
    </div>
  )
}
