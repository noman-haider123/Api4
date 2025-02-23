import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Crud from './Crud.jsx'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Createdata from './Createdata.jsx'
import Editdata from './Editdata.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
      <Route exact path='/' element = {<Crud/>}></Route>
      <Route exact path='/Createdata' element = {<Createdata/>}></Route>
      <Route exact path='/Editdata/:id' element = {<Editdata/>}></Route>
      </Routes>
    </Router>
  </StrictMode>,
)
