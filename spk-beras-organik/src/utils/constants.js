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
      description: 'Prioritas pada konsistensi harga dan kredibilitas pembayaran',
      icon: '💰',
      weights: PETANI_DEFAULT_WEIGHTS
    },
    quality: {
      name: 'Fokus Kredibilitas & Transparansi',
      description: 'Utamakan pembeli terpercaya dengan harga transparan',
      icon: '🤝',
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
      description: 'Seimbangkan volume, jarak, dan stabilitas harga',
      icon: '🚚',
      weights: {
        stabilitas: 25,
        kredibilitas: 20,
        volume: 25,
        jarak: 25,
        transparansi: 5
      }
    },
    volume: {
      name: 'Fokus Volume Besar',
      description: 'Prioritaskan pembeli dengan kapasitas pembelian tinggi',
      icon: '📦',
      weights: {
        stabilitas: 20,
        kredibilitas: 25,
        volume: 40,
        jarak: 10,
        transparansi: 5
      }
    }
  },
  pedagang: {
    default: {
      name: 'Fokus Keseimbangan',
      description: 'Seimbangkan kualitas, reliabilitas, dan harga',
      icon: '⚖️',
      weights: PEDAGANG_DEFAULT_WEIGHTS
    },
    quality: {
      name: 'Fokus Kualitas Premium',
      description: 'Utamakan konsistensi kualitas dan reliabilitas supply',
      icon: '⭐',
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
      description: 'Prioritaskan harga terbaik dengan reliabilitas memadai',
      icon: '💸',
      weights: {
        konsistensi: 20,
        reliabilitas: 25,
        harga: 40,
        kapasitas: 10,
        teknologi: 5
      }
    },
    tech: {
      name: 'Fokus Teknologi Modern',
      description: 'Utamakan supplier dengan adopsi teknologi tinggi',
      icon: '🚀',
      weights: {
        konsistensi: 20,
        reliabilitas: 20,
        harga: 20,
        kapasitas: 15,
        teknologi: 25
      }
    }
  }
}

// Sample data for prototype demonstration
export const SAMPLE_BUYERS = [
  {
    name: 'Distributor Regional PT Beras Sejahtera',
    stabilitas: 8.5,
    kredibilitas: 9,
    volume: 5000,
    jarak: 45,
    transparansi: 8,
    description: 'Perusahaan distribusi skala besar dengan jaringan luas di Jawa Barat',
    details: {
      alamat: 'Jl. Industri No. 123, Bandung',
      kontrak: 'Kontrak jangka panjang 12 bulan',
      pembayaran: 'Transfer bank H+7',
      pengalaman: '15 tahun di industri beras organik'
    }
  },
  {
    name: 'Pedagang Pasar Tradisional Pak Joko',
    stabilitas: 18.2,
    kredibilitas: 6,
    volume: 800,
    jarak: 12,
    transparansi: 5,
    description: 'Pedagang di Pasar Induk Caringin dengan pelanggan tetap',
    details: {
      alamat: 'Pasar Induk Caringin Blok B-12',
      kontrak: 'Pembelian rutin mingguan',
      pembayaran: 'Cash on delivery',
      pengalaman: '8 tahun berdagang beras'
    }
  },
  {
    name: 'Retailer Modern - SuperFresh Mart',
    stabilitas: 12.3,
    kredibilitas: 8,
    volume: 2000,
    jarak: 25,
    transparansi: 7,
    description: 'Jaringan supermarket dengan 5 cabang di kota',
    details: {
      alamat: 'Jl. Merdeka No. 45, Bogor',
      kontrak: 'Kontrak 6 bulan dengan review berkala',
      pembayaran: 'Transfer H+14',
      pengalaman: '10 tahun fokus produk organik'
    }
  },
  {
    name: 'Platform E-commerce OrganikKu',
    stabilitas: 15.7,
    kredibilitas: 7,
    volume: 1500,
    jarak: 35,
    transparansi: 9,
    description: 'Marketplace online khusus produk organik',
    details: {
      alamat: 'Virtual/Online - Gudang di Depok',
      kontrak: 'Kerjasama konsinyasi',
      pembayaran: 'Escrow system H+3',
      pengalaman: '5 tahun platform e-commerce'
    }
  }
]

export const SAMPLE_SUPPLIERS = [
  {
    name: 'Petani Individu - Pak Suryadi',
    konsistensi: 3.2,
    reliabilitas: 6,
    harga: 18000,
    kapasitas: 5,
    teknologi: 4,
    description: 'Petani mandiri dengan lahan 2 hektar di Sukabumi',
    details: {
      lokasi: 'Desa Cisaat, Sukabumi',
      sertifikasi: 'Organik Indonesia',
      metode: 'Pertanian organik tradisional',
      pengalaman: '12 tahun bertani padi organik'
    }
  },
  {
    name: 'Kelompok Tani Maju Bersama',
    konsistensi: 2.5,
    reliabilitas: 7,
    harga: 16500,
    kapasitas: 20,
    teknologi: 6,
    description: 'Koperasi 25 petani dengan total lahan 15 hektar',
    details: {
      lokasi: 'Kecamatan Cigombong, Bogor',
      sertifikasi: 'Organik Indonesia & SNI',
      metode: 'SRI (System of Rice Intensification)',
      pengalaman: '8 tahun sebagai kelompok tani'
    }
  },
  {
    name: 'Petani Kontrak PT Organik Nusantara',
    konsistensi: 1.8,
    reliabilitas: 9,
    harga: 17000,
    kapasitas: 35,
    teknologi: 7,
    description: 'Petani dengan kontrak eksklusif dan pendampingan teknis',
    details: {
      lokasi: 'Karawang dan Subang',
      sertifikasi: 'Organik Indonesia, USDA Organic',
      metode: 'Pertanian presisi dengan monitoring',
      pengalaman: '6 tahun kemitraan kontrak'
    }
  },
  {
    name: 'Smart Farm Cianjur',
    konsistensi: 1.2,
    reliabilitas: 8,
    harga: 19000,
    kapasitas: 15,
    teknologi: 9,
    description: 'Pertanian modern dengan sistem IoT dan otomasi',
    details: {
      lokasi: 'Cianjur Selatan',
      sertifikasi: 'Organik Indonesia, EU Organic',
      metode: 'Smart farming dengan sensor IoT',
      pengalaman: '4 tahun teknologi pertanian'
    }
  }
]
