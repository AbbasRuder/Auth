import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function HomeScreen() {

  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    // if user is not logged in, navigate to login
    if (!userInfo) {
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <p>HomeScreen</p>
      <p>It seems that Login is successful</p>
    </div>
  )
}
