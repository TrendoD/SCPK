import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import PetaniPage from './components/PetaniPage'
import PedagangPage from './components/PedagangPage'
import ThemeToggle from './components/common/ThemeToggle'
import './App.css'
import './styles/agricultural-theme.css'
import './styles/modern-ui-enhancements.css'
import './styles/enhanced-app.css'
import './styles/animations.css'
import './styles/enhanced-components.css'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <Router>
      <div className="app">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
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
