//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/..." element={<Page_xyz />} /> */}
      </Routes>
    </Router>
    </>
  )
}

export default App
