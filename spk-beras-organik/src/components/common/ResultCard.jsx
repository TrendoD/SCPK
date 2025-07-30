import { useState, useEffect } from 'react'
import { getRecommendation } from '../../utils/spkEngine'
import './ResultCard.css'

function ResultCard({ rank, data, criteria }) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedScores, setAnimatedScores] = useState({
    saw: 0,
    topsis: 0,
    combined: 0
  })
  
  const recommendation = getRecommendation(rank, data.combinedScore)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true)
      
      // Animate score bars
      const animationDuration = 1500
      const startTime = Date.now()
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / animationDuration, 1)
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        
        setAnimatedScores({
          saw: data.sawScore * easeOutCubic,
          topsis: data.topsisScore * easeOutCubic,
          combined: data.combinedScore * easeOutCubic
        })
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }, rank * 150) // Stagger animations based on rank
    
    return () => clearTimeout(timer)
  }, [rank, data])
  
  const getMedalEmoji = (rank) => {
    switch(rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  const getScoreCategory = (score) => {
    if (score >= 0.8) return 'excellent'
    if (score >= 0.6) return 'good'
    if (score >= 0.4) return 'average'
    return 'poor'
  }

  const getPerformanceIndicator = (score) => {
    if (score >= 0.8) return { text: 'Sangat Baik', color: '#4CAF50', icon: '⭐' }
    if (score >= 0.6) return { text: 'Baik', color: '#2196F3', icon: '👍' }
    if (score >= 0.4) return { text: 'Cukup', color: '#FF9800', icon: '👌' }
    return { text: 'Kurang', color: '#F44336', icon: '⚠️' }
  }

  const radarData = Object.entries(criteria).map(([key, criterion]) => ({
    label: criterion.name,
    value: data[key],
    normalizedValue: (data[key] - criterion.min) / (criterion.max - criterion.min) || 0
  }))

  const performanceIndicator = getPerformanceIndicator(data.combinedScore)

  return (
    <div className={`result-card rank-${rank} ${isVisible ? 'visible' : ''} score-${getScoreCategory(data.combinedScore)}`}>
      <div className="card-header">
        <div className="rank-container">
          <span className="rank">{getMedalEmoji(rank)}</span>
          <div className="rank-info">
            <span className="rank-number">Peringkat {rank}</span>
            <div className="performance-indicator" style={{ color: performanceIndicator.color }}>
              <span className="performance-icon">{performanceIndicator.icon}</span>
              <span className="performance-text">{performanceIndicator.text}</span>
            </div>
          </div>
        </div>
        
        <div className="name-section">
          <h3>{data.name}</h3>
          <span 
            className="recommendation-badge"
            style={{ backgroundColor: recommendation.color }}
          >
            {recommendation.text}
          </span>
        </div>
      </div>
      
      <div className="scores-section">
        <div className="scores-overview">
          <div className="main-score">
            <div className="circular-progress">
              <svg viewBox="0 0 120 120" className="circular-chart">
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="rgba(6, 214, 160, 0.1)" 
                  strokeWidth="12"
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${animatedScores.combined * 339.292} 339.292`}
                  transform="rotate(-90 60 60)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary-emerald)" />
                    <stop offset="100%" stopColor="var(--emerald-dark)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="score-center">
                <span className="main-score-value">{(animatedScores.combined * 100).toFixed(0)}%</span>
                <span className="main-score-label">Skor Total</span>
              </div>
            </div>
          </div>
          
          <div className="detailed-scores">
            <div className="score-item saw">
              <div className="score-header">
                <label>SAW</label>
                <span className="score-percentage">{(animatedScores.saw * 100).toFixed(1)}%</span>
              </div>
              <div className="score-bar">
                <div 
                  className="score-fill"
                  style={{ width: `${animatedScores.saw * 100}%` }}
                />
              </div>
            </div>
            
            <div className="score-item topsis">
              <div className="score-header">
                <label>TOPSIS</label>
                <span className="score-percentage">{(animatedScores.topsis * 100).toFixed(1)}%</span>
              </div>
              <div className="score-bar">
                <div 
                  className="score-fill"
                  style={{ width: `${animatedScores.topsis * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="score-comparison">
          <h4>Perbandingan Metode</h4>
          <div className="comparison-chart">
            <div className="chart-bar">
              <div className="bar-label">SAW</div>
              <div className="bar-container">
                <div 
                  className="bar-fill saw-bar" 
                  style={{ height: `${animatedScores.saw * 100}%` }}
                ></div>
              </div>
              <div className="bar-value">{(animatedScores.saw * 100).toFixed(0)}%</div>
            </div>
            <div className="chart-bar">
              <div className="bar-label">TOPSIS</div>
              <div className="bar-container">
                <div 
                  className="bar-fill topsis-bar" 
                  style={{ height: `${animatedScores.topsis * 100}%` }}
                ></div>
              </div>
              <div className="bar-value">{(animatedScores.topsis * 100).toFixed(0)}%</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="criteria-section">
        <div className="criteria-header">
          <h4>Analisis Kriteria</h4>
          <div className="criteria-summary">
            <span className="criteria-count">{Object.keys(criteria).length} Kriteria</span>
          </div>
        </div>
        
        <div className="criteria-radar">
          <div className="radar-chart">
            <svg viewBox="0 0 200 200" className="radar-svg">
              {/* Radar grid */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, i) => (
                <polygon
                  key={i}
                  points={radarData.map((_, j) => {
                    const angle = (j * 360 / radarData.length) * Math.PI / 180
                    const x = 100 + (60 * level) * Math.cos(angle - Math.PI / 2)
                    const y = 100 + (60 * level) * Math.sin(angle - Math.PI / 2)
                    return `${x},${y}`
                  }).join(' ')}
                  fill="none"
                  stroke="rgba(6, 214, 160, 0.1)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Radar axes */}
              {radarData.map((item, i) => {
                const angle = (i * 360 / radarData.length) * Math.PI / 180
                const x = 100 + 60 * Math.cos(angle - Math.PI / 2)
                const y = 100 + 60 * Math.sin(angle - Math.PI / 2)
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke="rgba(6, 214, 160, 0.2)"
                    strokeWidth="1"
                  />
                )
              })}
              
              {/* Data polygon */}
              <polygon
                points={radarData.map((item, i) => {
                  const angle = (i * 360 / radarData.length) * Math.PI / 180
                  const normalizedValue = Math.max(0, Math.min(1, item.normalizedValue))
                  const x = 100 + (60 * normalizedValue) * Math.cos(angle - Math.PI / 2)
                  const y = 100 + (60 * normalizedValue) * Math.sin(angle - Math.PI / 2)
                  return `${x},${y}`
                }).join(' ')}
                fill="rgba(6, 214, 160, 0.2)"
                stroke="var(--primary-emerald)"
                strokeWidth="2"
              />
              
              {/* Data points */}
              {radarData.map((item, i) => {
                const angle = (i * 360 / radarData.length) * Math.PI / 180
                const normalizedValue = Math.max(0, Math.min(1, item.normalizedValue))
                const x = 100 + (60 * normalizedValue) * Math.cos(angle - Math.PI / 2)
                const y = 100 + (60 * normalizedValue) * Math.sin(angle - Math.PI / 2)
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="var(--primary-emerald)"
                    stroke="white"
                    strokeWidth="2"
                  />
                )
              })}
            </svg>
          </div>
        </div>
        
        <div className="criteria-list">
          {Object.entries(criteria).map(([key, criterion], index) => {
            const normalizedValue = Math.max(0, Math.min(1, (data[key] - criterion.min) / (criterion.max - criterion.min) || 0))
            return (
              <div key={key} className="criterion-item">
                <div className="criterion-info">
                  <span className="criterion-label">{criterion.name}</span>
                  <span className="criterion-value">
                    {data[key]} {criterion.unit}
                  </span>
                </div>
                <div className="criterion-bar">
                  <div 
                    className="criterion-fill"
                    style={{ 
                      width: `${normalizedValue * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
                <div className="criterion-score">
                  {(normalizedValue * 100).toFixed(0)}%
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {rank === 1 && (
        <div className="recommendation-note">
          <div className="note-content">
            <span className="note-icon">🏆</span>
            <div className="note-text">
              <strong>Rekomendasi Terbaik</strong>
              <p>Pilihan optimal berdasarkan kriteria dan bobot yang Anda tentukan</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="card-actions">
        <button className="action-btn details-btn" onClick={() => setIsVisible(!isVisible)}>
          <span>📊</span> Detail
        </button>
        <button className="action-btn compare-btn">
          <span>⚖️</span> Bandingkan
        </button>
      </div>
    </div>
  )
}

export default ResultCard