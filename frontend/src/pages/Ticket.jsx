import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeTicket, getTicket } from '../features/tickets/ticketSlice'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

function Ticket() {
  const dispatch = useDispatch()
  const { ticket } = useSelector((state)=>state.tickets)
  const { id } = useParams();
  const navitate = useNavigate()

  useEffect(()=>{
    dispatch(getTicket(id))
    .unwrap()
    .then((data)=>{
        
    })
    .catch(toast.error)
  },[dispatch])

  const onTicketClose = () => {
    dispatch(closeTicket(id))
    .unwrap()
    .then(()=>{
        toast.success("Delete ticket")
        navitate('/view-tickets')
    })
    .catch(toast.error)
  }

  console.log(ticket.status)

  return (
    <div className="ticket-page">
        <header className="ticket-header">
            <h2>
                Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>
                    {ticket.status}
                </span>
            </h2>
            <h3>
                Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
            </h3>
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className='ticket-desc'>
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
            </div>
            <h2>Notes</h2>
        </header>
        {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket