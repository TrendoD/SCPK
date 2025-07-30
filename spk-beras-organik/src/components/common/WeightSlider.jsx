import { useState, useRef, useEffect } from 'react'
import './WeightSliderOptimized.css'

function WeightSlider({ label, value, onChange, description }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const sliderRef = useRef(null)
  const thumbRef = useRef(null)

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value)
    onChange(newValue)
    
    // Trigger pulse animation on value change
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Keyboard navigation support
  const handleKeyDown = (e) => {
    let newValue = value
    
    switch(e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault()
        newValue = Math.max(0, value - 5)
        break
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault()
        newValue = Math.min(100, value + 5)
        break
      case 'Home':
        e.preventDefault()
        newValue = 0
        break
      case 'End':
        e.preventDefault()
        newValue = 100
        break
      case 'PageDown':
        e.preventDefault()
        newValue = Math.max(0, value - 25)
        break
      case 'PageUp':
        e.preventDefault()
        newValue = Math.min(100, value + 25)
        break
      default:
        return
    }
    
    if (newValue !== value) {
      onChange(newValue)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 200)
    }
  }

  // Add visual feedback for different value ranges
  const getValueClass = () => {
    if (value === 0) return 'value-zero'
    if (value < 25) return 'value-low'
    if (value < 50) return 'value-medium-low'
    if (value < 75) return 'value-medium-high'
    return 'value-high'
  }

  const getRecommendationText = () => {
    if (value === 0) return 'Tidak ada pengaruh'
    if (value < 25) return 'Pengaruh rendah'
    if (value < 50) return 'Pengaruh sedang'
    if (value < 75) return 'Pengaruh tinggi'
    return 'Pengaruh sangat tinggi'
  }

  return (
    <div className={`weight-slider ${isDragging ? 'dragging' : ''} ${isAnimating ? 'animating' : ''} ${getValueClass()}`}>
      <div className="slider-header">
        <label htmlFor={`slider-${label.replace(/\s+/g, '-').toLowerCase()}`}>
          {label}
          <span className="sr-only"> - Gunakan panah atau drag untuk mengatur</span>
        </label>
        <div className="slider-value-container">
          <span className="slider-value" ref={thumbRef}>{value}%</span>
          <span className="value-recommendation">{getRecommendationText()}</span>
        </div>
      </div>
      
      {description && (
        <p className="slider-description">{description}</p>
      )}
      
      <div className="slider-container">
        <input
          ref={sliderRef}
          id={`slider-${label.replace(/\s+/g, '-').toLowerCase()}`}
          type="range"
          min="0"
          max="100"
          step="5"
          value={value}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onKeyDown={handleKeyDown}
          className="slider"
          style={{
            '--slider-value': `${value}%`,
            background: `linear-gradient(to right, var(--primary-emerald) 0%, var(--primary-emerald) ${value}%, rgba(6, 214, 160, 0.1) ${value}%, rgba(6, 214, 160, 0.1) 100%)`
          }}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={value}
          aria-valuetext={`${value} persen - ${getRecommendationText()}`}
          aria-describedby={description ? `desc-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined}
        />
        
        <div className="slider-track-fill" style={{ width: `${value}%` }}></div>
        
        <div className="slider-marks">
          {[0, 25, 50, 75, 100].map(mark => (
            <button
              key={mark}
              type="button"
              className={`slider-mark ${value === mark ? 'active' : ''}`}
              onClick={() => {
                onChange(mark)
                setIsAnimating(true)
                setTimeout(() => setIsAnimating(false), 200)
              }}
              aria-label={`Set value to ${mark}%`}
            >
              <span className="mark-line"></span>
              <span className="mark-label">{mark}%</span>
            </button>
          ))}
        </div>
      </div>
      
      {description && (
        <div id={`desc-${label.replace(/\s+/g, '-').toLowerCase()}`} className="sr-only">
          {description}
        </div>
      )}
    </div>
  )
}

export default WeightSlider
