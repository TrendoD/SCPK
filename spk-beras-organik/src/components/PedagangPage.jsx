import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WeightSlider from './common/WeightSlider'
import DataInputForm from './common/DataInputForm'
import DataPreview from './common/DataPreview'
import ResultCardOptimized from './common/ResultCardOptimized'
import { calculateSPK } from '../utils/spkEngine'
import { PEDAGANG_CRITERIA, PEDAGANG_DEFAULT_WEIGHTS, SAMPLE_SUPPLIERS } from '../utils/constants'
import './SPKPageOptimized.css'

function PedagangPage() {
  const navigate = useNavigate()
  const [suppliers, setSuppliers] = useState([])
  const [weights, setWeights] = useState(PEDAGANG_DEFAULT_WEIGHTS)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [sampleDataLoaded, setSampleDataLoaded] = useState(false)
  const [selectedSupplierDetails, setSelectedSupplierDetails] = useState(null)

  const handleAddSupplier = (supplierData) => {
    setSuppliers([...suppliers, { id: Date.now(), ...supplierData }])
  }

  const handleRemoveSupplier = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id))
  }

  const handleWeightChange = (criterion, value) => {
    setWeights({ ...weights, [criterion]: value })
  }

  const handleCalculate = async () => {
    if (suppliers.length < 2) {
      alert('Tambahkan minimal 2 supplier untuk membandingkan!')
      return
    }

    setIsCalculating(true)
    
    setTimeout(() => {
      const calculatedResults = calculateSPK(suppliers, weights, PEDAGANG_CRITERIA)
      setResults(calculatedResults)
      setShowResults(true)
      setIsCalculating(false)
    }, 1000)
  }

  const handleReset = () => {
    setShowResults(false)
    setResults(null)
  }

  const loadSampleData = () => {
    const sampleSuppliersWithIds = SAMPLE_SUPPLIERS.map((supplier, index) => ({
      ...supplier,
      id: Date.now() + index,
      isSample: true
    }))
    setSuppliers(sampleSuppliersWithIds)
    setSampleDataLoaded(true)
  }

  const handleViewDetails = (supplier) => {
    setSelectedSupplierDetails(supplier)
  }

  return (
    <div className="spk-container">
      <header className="spk-header pedagang-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Kembali
        </button>
        <h1>SPK untuk Pedagang</h1>
        <p>Temukan supplier terpercaya untuk bisnis Anda</p>
      </header>

      {!showResults ? (
        <>
          <section className="input-section">
            <h2>1. Tambah Data Supplier</h2>
            <DataInputForm 
              criteria={PEDAGANG_CRITERIA}
              onSubmit={handleAddSupplier}
              userType="pedagang"
            />
            
            {!sampleDataLoaded && suppliers.length === 0 && (
              <div className="sample-data-section">
                <p className="sample-data-info">
                  Untuk demonstrasi prototype, Anda dapat memuat data supplier contoh:
                </p>
                <button 
                  className="load-sample-button"
                  onClick={loadSampleData}
                >
                  📊 Muat Data Contoh (4 Supplier)
                </button>
              </div>
            )}
            
            {suppliers.length > 0 && (
              <div className="added-buyers">
                <h3>Supplier yang ditambahkan ({suppliers.length})</h3>
                <div className="buyer-list">
                  {suppliers.map(supplier => (
                    <div key={supplier.id} className={`buyer-item ${supplier.isSample ? 'sample-data' : ''}`}>
                      <div className="buyer-info">
                        <span className="buyer-name">{supplier.name}</span>
                        {supplier.isSample && <span className="sample-badge">Data Contoh</span>}
                      </div>
                      <div className="buyer-actions">
                        {supplier.details && (
                          <button 
                            className="view-details-btn"
                            onClick={() => handleViewDetails(supplier)}
                          >
                            👁️ Detail
                          </button>
                        )}
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemoveSupplier(supplier.id)}
                        >
                          Hapus
                        </button>
                      </div>
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
                onClick={() => setWeights(PEDAGANG_DEFAULT_WEIGHTS)}
              >
                Gunakan Bobot Default
              </button>
            </div>
            
            <div className="weight-sliders">
              {Object.entries(PEDAGANG_CRITERIA).map(([key, criterion]) => (
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
              data={suppliers}
              weights={weights}
              criteria={PEDAGANG_CRITERIA}
            />
            
            <div className="action-buttons">
              <button 
                className="calculate-button"
                onClick={handleCalculate}
                disabled={
                  suppliers.length < 2 || 
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
              <ResultCardOptimized
                key={result.id}
                rank={index + 1}
                data={result}
                criteria={PEDAGANG_CRITERIA}
              />
            ))}
          </div>
          
          <div className="method-comparison">
            <h3>Perbandingan Metode</h3>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Supplier</th>
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
      
      {selectedSupplierDetails && (
        <div className="details-modal-overlay" onClick={() => setSelectedSupplierDetails(null)}>
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detail Supplier</h3>
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedSupplierDetails(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="detail-section">
                <h4>{selectedSupplierDetails.name}</h4>
                {selectedSupplierDetails.description && (
                  <p className="buyer-description">{selectedSupplierDetails.description}</p>
                )}
              </div>
              
              <div className="detail-section">
                <h5>Kriteria Penilaian:</h5>
                <div className="criteria-details">
                  <div className="detail-item">
                    <span className="detail-label">Konsistensi Kualitas:</span>
                    <span className="detail-value">{selectedSupplierDetails.konsistensi} grade</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Reliabilitas Supply:</span>
                    <span className="detail-value">{selectedSupplierDetails.reliabilitas}/10</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Harga Kompetitif:</span>
                    <span className="detail-value">Rp {selectedSupplierDetails.harga.toLocaleString('id-ID')}/kg</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Kapasitas Produksi:</span>
                    <span className="detail-value">{selectedSupplierDetails.kapasitas} ton/bulan</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Adopsi Teknologi:</span>
                    <span className="detail-value">{selectedSupplierDetails.teknologi}/10</span>
                  </div>
                </div>
              </div>
              
              {selectedSupplierDetails.details && (
                <div className="detail-section">
                  <h5>Informasi Tambahan:</h5>
                  <div className="additional-details">
                    {selectedSupplierDetails.details.lokasi && (
                      <div className="detail-item">
                        <span className="detail-label">📍 Lokasi:</span>
                        <span className="detail-value">{selectedSupplierDetails.details.lokasi}</span>
                      </div>
                    )}
                    {selectedSupplierDetails.details.sertifikasi && (
                      <div className="detail-item">
                        <span className="detail-label">📜 Sertifikasi:</span>
                        <span className="detail-value">{selectedSupplierDetails.details.sertifikasi}</span>
                      </div>
                    )}
                    {selectedSupplierDetails.details.metode && (
                      <div className="detail-item">
                        <span className="detail-label">🌾 Metode:</span>
                        <span className="detail-value">{selectedSupplierDetails.details.metode}</span>
                      </div>
                    )}
                    {selectedSupplierDetails.details.pengalaman && (
                      <div className="detail-item">
                        <span className="detail-label">🏆 Pengalaman:</span>
                        <span className="detail-value">{selectedSupplierDetails.details.pengalaman}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PedagangPage
