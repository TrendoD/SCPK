import { useState, useRef, useEffect } from 'react'
import './DataInputForm.css'

function DataInputForm({ criteria, onSubmit, userType }) {
  const initialFormData = {
    name: '',
    ...Object.keys(criteria).reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {})
  }

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [focused, setFocused] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleFocus = (fieldName) => {
    setFocused({ ...focused, [fieldName]: true })
  }

  const handleBlur = (fieldName, value) => {
    setFocused({ ...focused, [fieldName]: false })
    
    // Real-time validation on blur
    if (value && fieldName !== 'name') {
      const criterion = criteria[fieldName]
      if (criterion && isNaN(value)) {
        setErrors({ ...errors, [fieldName]: 'Harus berupa angka' })
      } else if (criterion) {
        const numValue = parseFloat(value)
        let error = ''
        if (criterion.min !== undefined && numValue < criterion.min) {
          error = `Minimal ${criterion.min}`
        } else if (criterion.max !== undefined && numValue > criterion.max) {
          error = `Maksimal ${criterion.max}`
        }
        if (error) {
          setErrors({ ...errors, [fieldName]: error })
        }
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi'
    }
    
    Object.entries(criteria).forEach(([key, criterion]) => {
      const value = formData[key]
      
      if (!value) {
        newErrors[key] = `${criterion.name} wajib diisi`
      } else if (isNaN(value)) {
        newErrors[key] = 'Harus berupa angka'
      } else {
        const numValue = parseFloat(value)
        if (criterion.min !== undefined && numValue < criterion.min) {
          newErrors[key] = `Minimal ${criterion.min}`
        }
        if (criterion.max !== undefined && numValue > criterion.max) {
          newErrors[key] = `Maksimal ${criterion.max}`
        }
      }
    })
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Focus first field with error
      const firstErrorField = Object.keys(validationErrors)[0]
      const errorElement = formRef.current?.querySelector(`[name="${firstErrorField}"]`)
      if (errorElement) {
        errorElement.focus()
      }
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate processing time for better UX
    setTimeout(() => {
      onSubmit(formData)
      setFormData(initialFormData)
      setFocused({})
      setErrors({})
      setIsSubmitting(false)
      
      // Show success animation
      const submitButton = formRef.current?.querySelector('.submit-button')
      if (submitButton) {
        submitButton.classList.add('success-animation')
        setTimeout(() => {
          submitButton.classList.remove('success-animation')
        }, 1000)
      }
    }, 800)
  }

  const getFieldClass = (fieldName, value) => {
    let classes = ['form-field']
    if (errors[fieldName]) classes.push('has-error')
    if (focused[fieldName]) classes.push('is-focused')
    if (value) classes.push('has-value')
    return classes.join(' ')
  }

  const entityName = userType === 'petani' ? 'Pembeli' : 'Supplier'

  return (
    <form className="data-input-form" onSubmit={handleSubmit} ref={formRef}>
      <div className="form-header">
        <h3>Tambah Data {entityName}</h3>
        <p>Lengkapi informasi {entityName.toLowerCase()} untuk evaluasi</p>
      </div>
      
      <div className={getFieldClass('name', formData.name)}>
        <div className="floating-input">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => handleFocus('name')}
            onBlur={(e) => handleBlur('name', e.target.value)}
            placeholder=" "
            className={errors.name ? 'error' : ''}
            required
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          <label htmlFor="name">Nama {entityName}</label>
          <div className="input-highlight"></div>
        </div>
        {errors.name && (
          <div className="error-message" id="name-error" role="alert">
            <span className="error-icon">⚠</span>
            {errors.name}
          </div>
        )}
      </div>
      
      <div className="criteria-inputs">
        {Object.entries(criteria).map(([key, criterion]) => (
          <div key={key} className={getFieldClass(key, formData[key])}>
            <div className="floating-input">
              <input
                type={criterion.inputType}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                onFocus={() => handleFocus(key)}
                onBlur={(e) => handleBlur(key, e.target.value)}
                placeholder=" "
                min={criterion.min}
                max={criterion.max}
                step={criterion.inputType === 'number' ? 'any' : undefined}
                className={errors[key] ? 'error' : ''}
                required
                aria-describedby={errors[key] ? `${key}-error` : `${key}-hint`}
              />
              <label htmlFor={key}>
                {criterion.name}
                {criterion.unit && <span className="unit"> ({criterion.unit})</span>}
              </label>
              <div className="input-highlight"></div>
            </div>
            
            <div className="field-info">
              {criterion.min !== undefined || criterion.max !== undefined ? (
                <small className="field-hint" id={`${key}-hint`}>
                  {criterion.min !== undefined && criterion.max !== undefined
                    ? `${criterion.min} - ${criterion.max}`
                    : criterion.min !== undefined
                    ? `Min: ${criterion.min}`
                    : `Max: ${criterion.max}`}
                </small>
              ) : null}
              
              {errors[key] && (
                <div className="error-message" id={`${key}-error`} role="alert">
                  <span className="error-icon">⚠</span>
                  {errors[key]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="form-actions">
        <button 
          type="submit" 
          className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Menambahkan...
            </>
          ) : (
            <>
              <span className="submit-icon">+</span>
              Tambah {entityName}
            </>
          )}
        </button>
        
        <div className="form-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${(Object.values(formData).filter(v => v).length / (Object.keys(formData).length)) * 100}%` 
              }}
            ></div>
          </div>
          <small className="progress-text">
            {Object.values(formData).filter(v => v).length} dari {Object.keys(formData).length} field terisi
          </small>
        </div>
      </div>
    </form>
  )
}

export default DataInputForm