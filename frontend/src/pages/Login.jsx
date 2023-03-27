import React, {useState} from 'react'
import {toast} from 'react-toastify';
import {FaSignInAlt} from 'react-icons/fa'
import { login } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import  {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })

  const navigate = useNavigate()

  const { email, password } = formData;
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector((state)=>state.auth)

  const onChange = (e) => {
    const {id, value} = e.target;

    setFormData(prevData=>({
        ...prevData,
        [id]:value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
        email,
        password
    }
    dispatch(login(userData))
    .unwrap()
    .then((user) => {
        toast.success(`Welcome Back! - ${user.name}`)
        navigate('/')
    })
    .catch(toast.error)
    }


  if(isLoading) {
    return <Spinner />
  }


  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Please Login with your email and password</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login