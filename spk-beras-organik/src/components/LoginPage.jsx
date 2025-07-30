import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Sistem Pendukung Keputusan</h1>
        <h2>Stabilisasi Harga Beras Organik</h2>
        <p>Pilih peran Anda untuk melanjutkan</p>
      </div>
      
      <div className="role-selection">
        <div 
          className="role-card petani-card"
          onClick={() => navigate('/petani')}
        >
          <div className="role-icon">🌾</div>
          <h3>Petani</h3>
          <p>Temukan pembeli terbaik untuk hasil panen Anda</p>
          <div className="role-features">
            <span>✓ Analisis stabilitas harga</span>
            <span>✓ Evaluasi kredibilitas pembeli</span>
            <span>✓ Rekomendasi optimal</span>
          </div>
          <button className="role-button">Masuk sebagai Petani</button>
        </div>

        <div 
          className="role-card pedagang-card"
          onClick={() => navigate('/pedagang')}
        >
          <div className="role-icon">🏪</div>
          <h3>Pedagang</h3>
          <p>Temukan supplier terpercaya untuk bisnis Anda</p>
          <div className="role-features">
            <span>✓ Evaluasi konsistensi kualitas</span>
            <span>✓ Analisis reliabilitas supply</span>
            <span>✓ Optimasi efisiensi distribusi</span>
          </div>
          <button className="role-button">Masuk sebagai Pedagang</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage