import { useState, useEffect } from 'react'
import { getRecommendation } from '../../utils/spkEngine'
import './ResultCardOptimized.css'

function ResultCardOptimized({ rank, data, criteria }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const recommendation = getRecommendation(rank, data.combinedScore)

  useEffect(() => {
    // Simple entrance animation with stagger
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, rank * 100) // Reduced stagger time
    
    return () => clearTimeout(timer)
  }, [rank])
  
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

  return (
    <div className={`result-card-optimized rank-${rank} ${isVisible ? 'visible' : ''} score-${getScoreCategory(data.combinedScore)}`}>
      {/* Simplified Header */}
      <div className="card-header-optimized">
        <div className="rank-badge">
          <span className="rank-icon">{getMedalEmoji(rank)}</span>
        </div>
        
        <div className="card-title">
          <h3>{data.name}</h3>
          <span 
            className="recommendation-badge"
            style={{ backgroundColor: recommendation.color }}
          >
            {recommendation.text}
          </span>
        </div>

        <div className="main-score">
          <div className="score-value">{(data.combinedScore * 100).toFixed(0)}%</div>
          <div className="score-label">Skor Total</div>
        </div>
      </div>
      
      {/* Key Metrics Summary */}
      <div className="metrics-summary">
        <div className="metric-item">
          <span className="metric-label">SAW</span>
          <div className="metric-bar">
            <div 
              className="metric-fill saw"
              style={{ width: `${data.sawScore * 100}%` }}
            />
          </div>
          <span className="metric-value">{(data.sawScore * 100).toFixed(1)}%</span>
        </div>
        
        <div className="metric-item">
          <span className="metric-label">TOPSIS</span>
          <div className="metric-bar">
            <div 
              className="metric-fill topsis"
              style={{ width: `${data.topsisScore * 100}%` }}
            />
          </div>
          <span className="metric-value">{(data.topsisScore * 100).toFixed(1)}%</span>
        </div>
      </div>
      
      {/* Top 3 Criteria Highlights */}
      <div className="criteria-highlights">
        {Object.entries(criteria)
          .slice(0, 3)
          .map(([key, criterion]) => {
            const normalizedValue = Math.max(0, Math.min(1, (data[key] - criterion.min) / (criterion.max - criterion.min) || 0))
            return (
              <div key={key} className="highlight-item">
                <span className="highlight-label">{criterion.name}</span>
                <span className="highlight-value">{data[key]} {criterion.unit}</span>
              </div>
            )
          })}
      </div>
      
      {/* Expandable Details */}
      <button 
        className="expand-button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? 'Sembunyikan Detail' : 'Lihat Detail'}</span>
        <svg 
          className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
          width="20" 
          height="20" 
          viewBox="0 0 20 20"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="expanded-content">
          <div className="all-criteria">
            <h4>Semua Kriteria</h4>
            <div className="criteria-grid">
              {Object.entries(criteria).map(([key, criterion]) => {
                const normalizedValue = Math.max(0, Math.min(1, (data[key] - criterion.min) / (criterion.max - criterion.min) || 0))
                return (
                  <div key={key} className="criterion-detail">
                    <div className="criterion-header">
                      <span className="criterion-name">{criterion.name}</span>
                      <span className="criterion-percentage">{(normalizedValue * 100).toFixed(0)}%</span>
                    </div>
                    <div className="criterion-value">{data[key]} {criterion.unit}</div>
                    <div className="criterion-progress">
                      <div 
                        className="criterion-progress-fill"
                        style={{ width: `${normalizedValue * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {rank === 1 && (
            <div className="best-choice-note">
              <span className="note-icon">🏆</span>
              <p>Pilihan terbaik berdasarkan kriteria dan bobot yang ditentukan</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ResultCardOptimized
