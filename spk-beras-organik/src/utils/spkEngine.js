// Normalisasi matriks keputusan
const normalizeMatrix = (data, criteria) => {
  const normalized = []
  const criteriaKeys = Object.keys(criteria)
  
  // Find min and max for each criterion
  const minMax = {}
  criteriaKeys.forEach(key => {
    const values = data.map(item => parseFloat(item[key]))
    minMax[key] = {
      min: Math.min(...values),
      max: Math.max(...values)
    }
  })
  
  // Normalize data
  data.forEach(item => {
    const normalizedItem = { ...item }
    criteriaKeys.forEach(key => {
      const value = parseFloat(item[key])
      const { min, max } = minMax[key]
      
      if (criteria[key].type === 'benefit') {
        // For benefit criteria: higher is better
        normalizedItem[`${key}_normalized`] = max === min ? 1 : (value - min) / (max - min)
      } else {
        // For cost criteria: lower is better
        normalizedItem[`${key}_normalized`] = max === min ? 1 : (max - value) / (max - min)
      }
    })
    normalized.push(normalizedItem)
  })
  
  return { normalized, minMax }
}

// Simple Additive Weighting (SAW) method
const calculateSAW = (normalizedData, weights, criteria) => {
  const results = []
  const criteriaKeys = Object.keys(criteria)
  
  normalizedData.forEach(item => {
    let score = 0
    criteriaKeys.forEach(key => {
      score += (item[`${key}_normalized`] * weights[key] / 100)
    })
    results.push({
      ...item,
      sawScore: score
    })
  })
  
  return results.sort((a, b) => b.sawScore - a.sawScore)
}

// TOPSIS method
const calculateTOPSIS = (normalizedData, weights, criteria) => {
  const criteriaKeys = Object.keys(criteria)
  const m = normalizedData.length
  const n = criteriaKeys.length
  
  // Step 1: Create weighted normalized matrix
  const weightedMatrix = normalizedData.map(item => {
    const weighted = { ...item }
    criteriaKeys.forEach(key => {
      weighted[`${key}_weighted`] = item[`${key}_normalized`] * weights[key] / 100
    })
    return weighted
  })
  
  // Step 2: Determine ideal positive and negative solutions
  const idealPositive = {}
  const idealNegative = {}
  
  criteriaKeys.forEach(key => {
    const values = weightedMatrix.map(item => item[`${key}_weighted`])
    idealPositive[key] = Math.max(...values)
    idealNegative[key] = Math.min(...values)
  })
  
  // Step 3: Calculate distance to ideal solutions
  const distances = weightedMatrix.map(item => {
    let positiveDistance = 0
    let negativeDistance = 0
    
    criteriaKeys.forEach(key => {
      positiveDistance += Math.pow(item[`${key}_weighted`] - idealPositive[key], 2)
      negativeDistance += Math.pow(item[`${key}_weighted`] - idealNegative[key], 2)
    })
    
    return {
      ...item,
      positiveDistance: Math.sqrt(positiveDistance),
      negativeDistance: Math.sqrt(negativeDistance)
    }
  })
  
  // Step 4: Calculate relative closeness
  const results = distances.map(item => {
    const totalDistance = item.positiveDistance + item.negativeDistance
    return {
      ...item,
      topsisScore: totalDistance === 0 ? 0 : item.negativeDistance / totalDistance
    }
  })
  
  return results.sort((a, b) => b.topsisScore - a.topsisScore)
}

// Main SPK calculation function
export const calculateSPK = (data, weights, criteria) => {
  // Validate total weight equals 100
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0)
  if (Math.abs(totalWeight - 100) > 0.01) {
    throw new Error('Total bobot harus 100%')
  }
  
  // Normalize the decision matrix
  const { normalized, minMax } = normalizeMatrix(data, criteria)
  
  // Calculate using both methods
  const sawResults = calculateSAW(normalized, weights, criteria)
  const topsisResults = calculateTOPSIS(normalized, weights, criteria)
  
  // Combine results
  const combinedResults = sawResults.map(sawItem => {
    const topsisItem = topsisResults.find(t => t.id === sawItem.id)
    return {
      ...sawItem,
      topsisScore: topsisItem.topsisScore,
      // Average rank from both methods
      combinedScore: (sawItem.sawScore + topsisItem.topsisScore) / 2
    }
  })
  
  // Sort by combined score
  combinedResults.sort((a, b) => b.combinedScore - a.combinedScore)
  
  return {
    rankings: combinedResults,
    metadata: {
      totalAlternatives: data.length,
      criteria: Object.keys(criteria).length,
      weights,
      minMax
    }
  }
}

// Utility function to format currency
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Utility function to get recommendation text
export const getRecommendation = (rank, score) => {
  if (rank === 1 && score > 0.8) {
    return { text: 'Sangat Direkomendasikan', color: '#06D6A0' }
  } else if (rank <= 2 && score > 0.6) {
    return { text: 'Direkomendasikan', color: '#05B589' }
  } else if (rank <= 3 && score > 0.4) {
    return { text: 'Cukup Baik', color: '#FFC107' }
  } else {
    return { text: 'Pertimbangan Lain', color: '#FF9800' }
  }
}