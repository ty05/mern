const asyncHandler = require('express-async-handler');

const Ticket = require('../models/ticketModel');

const createTicket = asyncHandler(async(req,res)=>{
    const {product, description} = req.body;
    if(!product | !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    }
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(200).json(ticket)
})

const getTickets = asyncHandler(async(req,res)=>{
    const allTickets = await Ticket.find({user:req.user.id})
    res.status(200).json(allTickets)
})

const getTicket = asyncHandler(async(req,res)=>{
    const ticket = await Ticket.findById(req.params.id)
    res.status(200).json(ticket)
})

const deleteTicket = asyncHandler(async(req,res)=>{
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket) {
        res.status(404)
        throw new Error('There is no ticket')
    }

    if (ticket.user.toString() != req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    await Ticket.findOneAndRemove(req.params.id)
    res.status(200).json({success: true})
})

const updateTicket = asyncHandler(async(req,res)=>{
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket) {
        res.status(404)
        throw new Error('no ticket found')
    }
    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authorized")
    }

    const updateTickt = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    )

    res.status(200).json(updateTicket)
})


module.exports = {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket
}