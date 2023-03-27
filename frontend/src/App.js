import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import CreateTicket from './pages/CreateTicket';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ViewMyTickets from './pages/ViewMyTickets';
import CheckLoggedin from './components/CheckLoggedin'
import Ticket from "./pages/Ticket"


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/new-ticket' element={
              <CheckLoggedin>
                <CreateTicket />
              </CheckLoggedin>
            } />
            <Route path='/view-tickets' element={
              <CheckLoggedin>
                <ViewMyTickets />
              </CheckLoggedin>
            } />
            <Route path='/ticket/:id' element={
              <CheckLoggedin>
                <Ticket />
              </CheckLoggedin>
            } />

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
    
  );
}

export default App;
