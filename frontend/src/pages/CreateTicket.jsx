import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {MdSupportAgent} from 'react-icons/md'
import { toast } from 'react-toastify'
import { createTicket } from '../features/tickets/ticketSlice'



function CreateTicket() {

  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  const [ticket, setTicket] = useState({
    name: user.name,
    email: user.email,
    product: '',
    description: '',
  })
  const navigate = useNavigate()

  const { name, email, product, description } = ticket;

  const onChange = (e) => {
    setTicket(prevData => ({
        ...prevData,
        [e.target.id]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    
    if(!product | !description) {
        toast.error('please fill all fields')
        
    }

    dispatch(createTicket({product, description}))
        .unwrap()
        .then((data) => {
            console.log(data,'data!')
            navigate('/view-tickets')
            toast.success("New ticket created")
        })
        .catch(toast.error)

    
  }

  return (
    <>
        <section className="heading">
            <h4>Create your ticket</h4>
            <p><MdSupportAgent /> Ask for help to our support team</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Your name</label>
                    <input type="text" value={name} id='name' onChange={onChange} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Your email</label>
                    <input type="text" value={email} id='email' onChange={onChange} disabled/>
                </div>
                <div className='form-group'>
                    <label htmlFor='product'>Product</label>
                    <select
                    name='product'
                    id='product'
                    value={product}
                    onChange={onChange}
                    >
                    <option value='iPhone'>iPhone</option>
                    <option value='Macbook Pro'>Macbook Pro</option>
                    <option value='iMac'>iMac</option>
                    <option value='iPad'>iPad</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Describe your issue here</label>
                    <input type="text" value={description} id='description' onChange={onChange} />
                </div>
                <button className="btn btn-block">Submit</button>
            </form>
        </section>
    </>
  )
}

export default CreateTicket