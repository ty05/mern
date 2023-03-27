import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { toast } from 'react-toastify'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth);

  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>
            {user ? 
                (
                    <>
                        <li>
                            <button className="btn" onClick={() => {
                                    dispatch(logout())
                                    navigate('/')
                                    toast.success("Logout now")
                                }}>

                                <FaSignOutAlt /> Signout
                            </button>
                        
                        </li>
                    </>
                ) 
            : 
                (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )
            }
          
        </ul>
    </header>
  )
}

export default Header