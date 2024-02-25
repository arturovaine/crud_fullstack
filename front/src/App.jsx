import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes'; 
import MainContent from './pages/MainContent';
import AccessNotAuthorized from './pages/AccessNotAuthorized';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/content" element={<MainContent />} />
            {/* All protected routes */}
          </Route>
          <Route path="/accessNotAuthorized" element={<AccessNotAuthorized />} />        
        </Routes>
      </Router>
    </>
  )
}

export default App
