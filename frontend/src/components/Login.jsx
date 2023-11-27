import { useState, useEffect } from 'react';
import heroImage from '../assets/heroImage.jpg'
// -lib
import { MdEmail } from "react-icons/md"
import { TbLockSquareRoundedFilled } from "react-icons/tb"
import { toast } from 'react-toastify'
// -RRD
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// -RTK
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email !== '' & password !== '') {
            try {
                // -'unwrap()' is required to be able to immediately access the results of the mutation.
                const res = await login({ email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success("Login successful", {
                    toastId: 'login-suc-tst'
                })
                navigate('/')
            } catch (error) {
                toast.error(error?.data?.message || "login failed", {
                    toastId: 'login-err-tst'
                })
            }
        }
    }

    useEffect(() => {
        // if user is already logged in, navigate to home
        if (userInfo) {
            navigate('/')
        }
    }, [])

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

                    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                        <div className='flex flex-col gap-3 text-[16px] sm:text-[22px]'>
                            <div className='w-72 sm:w-96 xl:w-[546px] py-2 px-2 flex  items-center gap-4 border rounded-xl border-[#FEC31C] bg-[#F7FCFD]'>
                                <MdEmail size={20} />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='bg-[#F7FCFD] focus:outline-none'
                                />
                            </div>
                            <div className='w-72 sm:w-96 xl:w-[546px] py-2 px-2 flex items-center gap-4 border rounded-xl border-[#FEC31C] bg-[#F7FCFD]'>
                                <TbLockSquareRoundedFilled size={20} />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='bg-[#F7FCFD] focus:outline-none'
                                />
                            </div>
                        </div>

                        <input
                            type='submit'
                            value='Login'
                            className='mt-8 sm:mt-14 w-72 sm:w-96 xl:w-[500px] py-1 rounded-xl cursor-pointer text-white text-[20px] sm:text-[28px] font-bold bg-[#FEC31C]'
                        />
                    </form>

                </main>
            </div>
        </div>
    )
}
