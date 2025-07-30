export const PETANI_CRITERIA = {
  stabilitas: {
    name: 'Stabilitas Harga',
    description: 'Konsistensi harga yang ditawarkan (semakin rendah variasi semakin baik)',
    unit: '%',
    type: 'cost',
    inputType: 'number',
    placeholder: 'Contoh: 8.5'
  },
  kredibilitas: {
    name: 'Kredibilitas Pembayaran',
    description: 'Reliabilitas pembayaran tepat waktu',
    unit: 'skor',
    type: 'benefit',
    inputType: 'number',
    placeholder: '1-10',
    min: 1,
    max: 10
  },
  volume: {
    name: 'Volume Pembelian',
    description: 'Kapasitas order per bulan',
    unit: 'kg/bulan',
    type: 'benefit',
    inputType: 'number',
    placeholder: 'Contoh: 5000'
  },
  jarak: {
    name: 'Jarak Lokasi',
    description: 'Jarak dari lokasi petani',
    unit: 'km',
    type: 'cost',
    inputType: 'number',
    placeholder: 'Contoh: 45'
  },
  transparansi: {
    name: 'Transparansi Harga',
    description: 'Keterbukaan informasi penetapan harga',
    unit: 'skor',
    type: 'benefit',
    inputType: 'number',
    placeholder: '1-10',
    min: 1,
    max: 10
  }
}

export const PEDAGANG_CRITERIA = {
  konsistensi: {
    name: 'Konsistensi Kualitas',
    description: 'Variasi standar grade produk (semakin rendah semakin baik)',
    unit: 'grade',
    type: 'cost',
    inputType: 'number',
    placeholder: 'Contoh: 2.5'
  },
  reliabilitas: {
    name: 'Reliabilitas Supply',
    description: 'Ketepatan waktu dan volume pengiriman',
    unit: 'skor',
    type: 'benefit',
    inputType: 'number',
    placeholder: '1-10',
    min: 1,
    max: 10
  },
  harga: {
    name: 'Harga Kompetitif',
    description: 'Harga per kilogram',
    unit: 'Rp/kg',
    type: 'cost',
    inputType: 'number',
    placeholder: 'Contoh: 15000'
  },
  kapasitas: {
    name: 'Kapasitas Produksi',
    description: 'Kemampuan produksi per bulan',
    unit: 'ton/bulan',
    type: 'benefit',
    inputType: 'number',
    placeholder: 'Contoh: 50'
  },
  teknologi: {
    name: 'Adopsi Teknologi',
    description: 'Tingkat penggunaan teknologi manajemen',
    unit: 'skor',
    type: 'benefit',
    inputType: 'number',
    placeholder: '1-10',
    min: 1,
    max: 10
  }
}

export const PETANI_DEFAULT_WEIGHTS = {
  stabilitas: 40,
  kredibilitas: 25,
  volume: 20,
  jarak: 10,
  transparansi: 5
}

export const PEDAGANG_DEFAULT_WEIGHTS = {
  konsistensi: 30,
  reliabilitas: 30,
  harga: 25,
  kapasitas: 10,
  teknologi: 5
}

export const WEIGHT_PRESETS = {
  petani: {
    default: {
      name: 'Fokus Stabilitas Pendapatan',
      weights: PETANI_DEFAULT_WEIGHTS
    },
    quality: {
      name: 'Fokus Kredibilitas & Transparansi',
      weights: {
        stabilitas: 20,
        kredibilitas: 35,
        volume: 15,
        jarak: 10,
        transparansi: 20
      }
    },
    efficiency: {
      name: 'Fokus Efisiensi Distribusi',
      weights: {
        stabilitas: 25,
        kredibilitas: 20,
        volume: 25,
        jarak: 25,
        transparansi: 5
      }
    }
  },
  pedagang: {
    default: {
      name: 'Fokus Efisiensi Distribusi',
      weights: PEDAGANG_DEFAULT_WEIGHTS
    },
    quality: {
      name: 'Fokus Kualitas & Reliabilitas',
      weights: {
        konsistensi: 35,
        reliabilitas: 35,
        harga: 15,
        kapasitas: 10,
        teknologi: 5
      }
    },
    cost: {
      name: 'Fokus Harga Kompetitif',
      weights: {
        konsistensi: 20,
        reliabilitas: 25,
        harga: 40,
        kapasitas: 10,
        teknologi: 5
      }
    }
  }
}