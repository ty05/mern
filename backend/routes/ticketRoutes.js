const express = require('express');
const { createTicket, getTickets, getTicket, updateTicket, deleteTicket } = require('../controllers/ticketControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createTicket)
router.get('/', protect, getTickets)
router.get('/:id', protect, getTicket)

router.delete('/:id', protect, deleteTicket)
router.put("/:id", protect, updateTicket)




module.exports = router;