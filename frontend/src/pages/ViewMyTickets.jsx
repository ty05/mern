import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TicketItem from '../components/TicketItem'
import { getTickets } from '../features/tickets/ticketSlice'

function ViewMyTickets() {


  const { tickets } = useSelector((state)=>state.tickets)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getTickets())
  },
  [dispatch])


  return (
    <> 
        {tickets.length == 0 ? <h1>No ticket found</h1> : (
            <>
                {tickets.map((ticket)=>{
                    return <TicketItem key={ticket._id} ticket={ticket} />
                    
                })}
            </>
        )}
    </>
  )
}

export default ViewMyTickets