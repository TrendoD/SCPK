import './DataPreview.css'

function DataPreview({ data, weights, criteria }) {
  if (data.length === 0) {
    return (
      <div className="data-preview empty">
        <p>Belum ada data yang ditambahkan</p>
      </div>
    )
  }

  return (
    <div className="data-preview">
      <div className="preview-tables">
        <div className="data-table">
          <h3>Data yang Diinput</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  {Object.entries(criteria).map(([key, criterion]) => (
                    <th key={key}>
                      {criterion.name}
                      <br />
                      <span className="unit">({criterion.unit})</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    {Object.keys(criteria).map((key) => (
                      <td key={key}>{item[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="weight-table">
          <h3>Bobot Kriteria</h3>
          <div className="weight-summary">
            {Object.entries(criteria).map(([key, criterion]) => (
              <div key={key} className="weight-item">
                <span className="criterion-name">{criterion.name}</span>
                <span className="weight-value">{weights[key]}%</span>
              </div>
            ))}
            <div className="weight-total">
              <span className="criterion-name">Total</span>
              <span className="weight-value">
                {Object.values(weights).reduce((sum, w) => sum + w, 0)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="preview-info">
        <p>
          <strong>Jumlah Alternatif:</strong> {data.length}
        </p>
        <p>
          <strong>Metode:</strong> SAW (Simple Additive Weighting) & TOPSIS
        </p>
      </div>
    </div>
  )
}

export default DataPreview