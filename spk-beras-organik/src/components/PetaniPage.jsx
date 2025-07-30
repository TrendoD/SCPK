import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WeightSlider from './common/WeightSlider'
import DataInputForm from './common/DataInputForm'
import DataPreview from './common/DataPreview'
import ResultCard from './common/ResultCard'
import { calculateSPK } from '../utils/spkEngine'
import { PETANI_CRITERIA, PETANI_DEFAULT_WEIGHTS } from '../utils/constants'
import './SPKPage.css'

function PetaniPage() {
  const navigate = useNavigate()
  const [buyers, setBuyers] = useState([])
  const [weights, setWeights] = useState(PETANI_DEFAULT_WEIGHTS)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleAddBuyer = (buyerData) => {
    setBuyers([...buyers, { id: Date.now(), ...buyerData }])
  }

  const handleRemoveBuyer = (id) => {
    setBuyers(buyers.filter(buyer => buyer.id !== id))
  }

  const handleWeightChange = (criterion, value) => {
    setWeights({ ...weights, [criterion]: value })
  }

  const handleCalculate = async () => {
    if (buyers.length < 2) {
      alert('Tambahkan minimal 2 pembeli untuk membandingkan!')
      return
    }

    setIsCalculating(true)
    
    setTimeout(() => {
      const calculatedResults = calculateSPK(buyers, weights, PETANI_CRITERIA)
      setResults(calculatedResults)
      setShowResults(true)
      setIsCalculating(false)
    }, 1000)
  }

  const handleReset = () => {
    setShowResults(false)
    setResults(null)
  }

  return (
    <div className="spk-container">
      <header className="spk-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Kembali
        </button>
        <h1>SPK untuk Petani</h1>
        <p>Temukan pembeli terbaik untuk hasil panen Anda</p>
      </header>

      {!showResults ? (
        <>
          <section className="input-section">
            <h2>1. Tambah Data Pembeli</h2>
            <DataInputForm 
              criteria={PETANI_CRITERIA}
              onSubmit={handleAddBuyer}
              userType="petani"
            />
            
            {buyers.length > 0 && (
              <div className="added-buyers">
                <h3>Pembeli yang ditambahkan ({buyers.length})</h3>
                <div className="buyer-list">
                  {buyers.map(buyer => (
                    <div key={buyer.id} className="buyer-item">
                      <span>{buyer.name}</span>
                      <button onClick={() => handleRemoveBuyer(buyer.id)}>
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="weight-section">
            <h2>2. Atur Bobot Kriteria</h2>
            <div className="weight-preset">
              <p>Gunakan bobot rekomendasi atau atur sendiri:</p>
              <button 
                className="preset-button"
                onClick={() => setWeights(PETANI_DEFAULT_WEIGHTS)}
              >
                Gunakan Bobot Default
              </button>
            </div>
            
            <div className="weight-sliders">
              {Object.entries(PETANI_CRITERIA).map(([key, criterion]) => (
                <WeightSlider
                  key={key}
                  label={criterion.name}
                  value={weights[key]}
                  onChange={(value) => handleWeightChange(key, value)}
                  description={criterion.description}
                />
              ))}
            </div>
            
            <div className="weight-total">
              Total Bobot: {Object.values(weights).reduce((a, b) => a + b, 0)}%
              {Object.values(weights).reduce((a, b) => a + b, 0) !== 100 && (
                <span className="warning"> (Harus 100%)</span>
              )}
            </div>
          </section>

          <section className="preview-section">
            <h2>3. Preview Data & Kalkulasi</h2>
            <DataPreview 
              data={buyers}
              weights={weights}
              criteria={PETANI_CRITERIA}
            />
            
            <div className="action-buttons">
              <button 
                className="calculate-button"
                onClick={handleCalculate}
                disabled={
                  buyers.length < 2 || 
                  Object.values(weights).reduce((a, b) => a + b, 0) !== 100 ||
                  isCalculating
                }
              >
                {isCalculating ? 'Menghitung...' : 'Hitung Rekomendasi'}
              </button>
            </div>
          </section>
        </>
      ) : (
        <section className="results-section">
          <h2>Hasil Rekomendasi</h2>
          <div className="results-grid">
            {results.rankings.map((result, index) => (
              <ResultCard
                key={result.id}
                rank={index + 1}
                data={result}
                criteria={PETANI_CRITERIA}
              />
            ))}
          </div>
          
          <div className="method-comparison">
            <h3>Perbandingan Metode</h3>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Pembeli</th>
                    <th>Skor SAW</th>
                    <th>Skor TOPSIS</th>
                    <th>Ranking</th>
                  </tr>
                </thead>
                <tbody>
                  {results.rankings.map((result, index) => (
                    <tr key={result.id}>
                      <td>{result.name}</td>
                      <td>{result.sawScore.toFixed(3)}</td>
                      <td>{result.topsisScore.toFixed(3)}</td>
                      <td>#{index + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="reset-button" onClick={handleReset}>
              Hitung Ulang
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

export default PetaniPage