import heroImage from '../assets/heroImage.jpg'
import { MdOutlineDriveFileRenameOutline, MdEmail } from "react-icons/md"
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { Link } from 'react-router-dom';

export default function Signup() {
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

          <section className='flex flex-col gap-3 text-[16px] sm:text-[22px]'>
            <div className='w-72 sm:w-96 xl:w-[546px] py-2 px-2 flex items-center gap-4 border rounded-xl border-[#FEC31C] bg-[#F7FCFD] focus:border focus:border-blue-500'>
              <MdOutlineDriveFileRenameOutline size={20} />
              <input type="text" placeholder='Name' className='w-full bg-[#F7FCFD] focus:outline-none ' />
            </div>
            <div className='w-72 sm:w-96 xl:w-[546px] py-2 px-2 flex items-center gap-4 border rounded-xl border-[#FEC31C] bg-[#F7FCFD]'>
              <MdEmail size={20} />
              <input type="email" placeholder='Email' className='bg-[#F7FCFD] focus:outline-none' />
            </div>
            <div className='w-72 sm:w-96 xl:w-[546px] py-2 px-2 flex items-center gap-4 border rounded-xl border-[#FEC31C] bg-[#F7FCFD]'>
              <TbLockSquareRoundedFilled size={20} />
              <input type="password" placeholder='Password' minLength={8} className='bg-[#F7FCFD] focus:outline-none' />
            </div>
          </section>

          <button className='mt-4 w-72 sm:w-96 xl:w-[500px] py-1 rounded-xl text-white text-[20px] sm:text-[28px] font-bold bg-[#FEC31C] '>
            Sign Up
          </button>
        </main>
      </div>
    </div>
  )
}
