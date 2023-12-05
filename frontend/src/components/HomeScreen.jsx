import React, { useState, useEffect } from 'react'
// -RRD
import { useNavigate } from 'react-router-dom'
// -RTK
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
// -other lib
import { toast } from 'react-toastify'
// -icons
import { FaEdit, FaWindowClose } from "react-icons/fa";


export default function HomeScreen() {
  const [updateModal, setUpdateModal] = useState(false)

  const { userInfo } = useSelector(state => state.auth)

  const [name, setName] = useState(userInfo?.name)
  const [email, setEmail] = useState(userInfo?.email)
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [updateInfo] = useUpdateMutation()

  useEffect(() => {
    // if user is not logged in, navigate to login
    if (!userInfo) {
      navigate('/login')
    }
  }, [])

  const handleUpdateModal = () => {
    setUpdateModal(current => !current)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const isEmailChanged = email !== userInfo?.email
    const isNameChanged = name !== userInfo?.name
    const isPswdChanged = password !== ""

    if (isEmailChanged | isNameChanged | isPswdChanged) {
      try {
        const res = await updateInfo({ name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        handleUpdateModal()
        toast("Updated successfully", { toastId: 'updt-suc' })
      } catch (error) {
        toast.error("Failed to update", { toastId: 'updt-err-1' })
      }
    } else {
      toast.error("Enter new details", { toastId: 'updt-err-2' })
    }
  }

  return (
    <div className='relative h-full sm:px-14 flex flex-col justify-center items-center'>
      <main className='relative w-[270px] sm:w-[320px] px-8 py-4 rounded border-l-8 border-yellow-400 bg-gray-800 text-white'>
        <FaEdit className='absolute right-0 top-0 m-2 cursor-pointer' onClick={handleUpdateModal} />
        <div className='flex flex-col'>
          <p className='opacity-50'>Username</p>
          <p>{userInfo?.name}</p>
        </div>
        <div className='mt-4 flex flex-col'>
          <p className='opacity-50'>Email</p>
          <p>{userInfo?.email}</p>
        </div>
      </main>
      {updateModal &&
        <form onSubmit={handleFormSubmit} className='absolute w-[300px] sm:w-[320px] flex flex-col gap-2 px-4 sm:px-10 py-6 rounded-md shadow-xl bg-gray-700'>
          <FaWindowClose color='red' className='absolute top-0 right-0 m-2 w-6 h-6 cursor-pointer' onClick={handleUpdateModal} />

          <label htmlFor="name" className='text-white'>New Name :</label>
          <input
            type='text'
            name='name'
            placeholder='Enter new name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='rounded sm:w-64 px-2 py-1'
          />

          <label htmlFor="email" className='text-white'>New Email :</label>
          <input
            type='email'
            name='email'
            placeholder='Enter new email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='rounded sm:w-64 px-2 py-1'
          />

          <label htmlFor="password" className='text-white'>New Password :</label>
          <input
            type='password'
            name='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='rounded sm:w-64 px-2 py-1'
          />

          <input
            type='submit'
            value='Update'
            className='mt-4 rounded sm:w-64 py-1 text-white font-semibold cursor-pointer bg-blue-400'
          />
        </form>
      }
    </div>
  )
}
