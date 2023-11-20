import heroImage from '../assets/heroImage.jpg'
import { MdEmail } from "react-icons/md"
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className='h-screen flex flex-col sm:flex-row font-inter'>
            {/* left (image) */}
            <img src={heroImage} alt="A 3d man working on tablet" className='h-1/2 object-cover sm:w-1/2 sm:h-full' />

            {/* content */}
            <div className='h-full sm:w-1/2'>
                <main className='h-full flex flex-col justify-center items-center gap-6 sm:gap-12'>
                    <section className='w-72 sm:w-96 xl:w-[546px]'>
                        <p className='text-left text-[28px] sm:text-[50px] font-bold'>Login</p>
                        <p className='text-start text-[10px] sm:text-[14px]'>
                            Don't have an account?
                            <Link to={'/signup'}>
                                <span className='text-blue-600'> Signup</span>
                            </Link>
                        </p>
                    </section>

                    <section className='flex flex-col gap-3 text-[16px] sm:text-[22px]'>
                        <div className='w-72 sm:w-96 xl:w-[546px] py-2 px-2 flex  items-center gap-4 border rounded-xl border-[#FEC31C] bg-[#F7FCFD]'>
                            <MdEmail size={20} />
                            <input type="email" required placeholder='Email' className='bg-[#F7FCFD] focus:outline-none' />
                        </div>
                        <div className='w-72 sm:w-96 xl:w-[546px] py-2 px-2 flex items-center gap-4 border rounded-xl border-[#FEC31C] bg-[#F7FCFD]'>
                            <TbLockSquareRoundedFilled size={20} />
                            <input type="password" required placeholder='Password' className='bg-[#F7FCFD] focus:outline-none' />
                        </div>
                    </section>

                    <button className='mt-4 w-72 sm:w-96 xl:w-[500px] py-1 rounded-xl text-white text-[20px] sm:text-[28px] font-bold bg-[#FEC31C] '>
                        Login
                    </button>
                </main>
            </div>
        </div>
    )
}
