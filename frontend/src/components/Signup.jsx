import { useState } from 'react';
// -assets/icons
import heroImage from '../assets/heroImage.jpg'
import { MdOutlineDriveFileRenameOutline, MdEmail } from "react-icons/md"
import { TbLockSquareRoundedFilled } from "react-icons/tb";
// -RRD
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// -RTK
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
// -other lib
import { toast } from 'react-toastify'


export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [registerUser] = useRegisterMutation()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const res = await registerUser({ name, email, password }).unwrap()
      dispatch(setCredentials({...res}))
      navigate('/')
      toast('User Registered Successfully', {
        toastId: 'signup-suc-tst'
      })
    } catch (error) {
      toast.error(error?.data?.message | 'Failed to register user', {
        toastId: 'signup-err-tst'
      })
    }
  }

  return (
    <div className='h-screen flex flex-col sm:flex-row font-inter'>
      {/* left (image) */}
      <img src={heroImage} alt="A 3d man working on tablet" className='h-1/2 object-cover sm:w-1/2 sm:h-full' />

      {/* content */}
      <div className='h-full sm:w-1/2'>
        <main className='h-full flex flex-col justify-center items-center gap-6 sm:gap-12'>
          <section className='w-72 sm:w-96 xl:w-[546px]'>
            <p className='text-left text-[28px] sm:text-[50px] font-bold'>Sign Up</p>
            <p className='text-start text-[10px] sm:text-[14px]'>
              Already have an account?
              <Link to={'/login'}>
                <span className='text-blue-600'> Login</span>
              </Link>
            </p>
          </section>

          <form onSubmit={handleSignup} className='flex flex-col items-center'>
            <div className='flex flex-col gap-3 text-[16px] sm:text-[22px]'>
              <div className='w-72 sm:w-96 xl:w-[546px] py-2 px-2 flex items-center gap-4 border rounded-xl border-[#FEC31C] bg-[#F7FCFD] focus:border focus:border-blue-500'>
                <MdOutlineDriveFileRenameOutline size={20} />
                <input
                  type="text"
                  required
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full bg-[#F7FCFD] focus:outline-none '
                />
              </div>
              <div className='w-72 sm:w-96 xl:w-[546px] py-2 px-2 flex items-center gap-4 border rounded-xl border-[#FEC31C] bg-[#F7FCFD]'>
                <MdEmail size={20} />
                <input
                  type="email"
                  required
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='bg-[#F7FCFD] focus:outline-none'
                />
              </div>
              <div className='w-72 sm:w-96 xl:w-[546px] py-2 px-2 flex items-center gap-4 border rounded-xl border-[#FEC31C] bg-[#F7FCFD]'>
                <TbLockSquareRoundedFilled size={20} />
                <input
                  type="password"
                  required
                  placeholder='Password'
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='bg-[#F7FCFD] focus:outline-none' />
              </div>
            </div>

            <input
              type='submit'
              value='Sign Up'
              className='mt-8 sm:mt-14 w-72 sm:w-96 xl:w-[500px] py-1 rounded-xl  text-white text-[20px] sm:text-[28px] cursor-pointer font-bold bg-[#FEC31C] ' />
          </form>

        </main>
      </div>
    </div>
  )
}
