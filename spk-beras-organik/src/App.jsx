import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import PetaniPage from './components/PetaniPage'
import PedagangPage from './components/PedagangPage'
import './App.css'
import './styles/agricultural-theme.css'
import './styles/modern-ui-enhancements.css'
import './styles/enhanced-app.css'
import './styles/animations.css'
import './styles/enhanced-components.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/petani" element={<PetaniPage />} />
          <Route path="/pedagang" element={<PedagangPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
