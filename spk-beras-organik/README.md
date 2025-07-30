# SPK Beras Organik - Sistem Pendukung Keputusan

Prototipe aplikasi Sistem Pendukung Keputusan (SPK) untuk membantu petani dan pedagang beras organik dalam mengambil keputusan optimal menggunakan metode MADM (Multi-Attribute Decision Making) dengan algoritma SAW dan TOPSIS.

## Fitur Utama

### Untuk Petani
- Evaluasi pembeli berdasarkan 5 kriteria:
  - Stabilitas harga penawaran
  - Kredibilitas pembayaran
  - Volume pembelian
  - Jarak lokasi
  - Transparansi harga
- Bobot kriteria dapat disesuaikan atau menggunakan rekomendasi default
- Hasil analisis dengan metode SAW dan TOPSIS

### Untuk Pedagang
- Evaluasi supplier berdasarkan 5 kriteria:
  - Konsistensi kualitas
  - Reliabilitas supply
  - Harga kompetitif
  - Kapasitas produksi
  - Adopsi teknologi
- Bobot kriteria dapat disesuaikan atau menggunakan rekomendasi default
- Hasil analisis dengan metode SAW dan TOPSIS

## Teknologi

- React 19 dengan Vite
- React Router untuk navigasi
- CSS3 untuk styling responsive
- Vanilla JavaScript untuk algoritma SPK

## Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser di `http://localhost:5173`

## Deployment ke Vercel

1. Build aplikasi:
```bash
npm run build
```

2. Deploy dengan Vercel CLI:
```bash
vercel --prod
```

Atau push ke GitHub dan connect dengan Vercel untuk automatic deployment.

## Struktur Folder

```
spk-beras-organik/
├── src/
│   ├── components/
│   │   ├── LoginPage.jsx
│   │   ├── PetaniPage.jsx
│   │   ├── PedagangPage.jsx
│   │   └── common/
│   │       ├── WeightSlider.jsx
│   │       ├── DataInputForm.jsx
│   │       ├── DataPreview.jsx
│   │       └── ResultCard.jsx
│   ├── utils/
│   │   ├── spkEngine.js
│   │   └── constants.js
│   └── App.jsx
├── package.json
└── README.md
```

## Cara Penggunaan

1. **Pilih Role**: Pilih apakah Anda petani atau pedagang
2. **Input Data**: Tambahkan minimal 2 alternatif (pembeli/supplier) dengan data lengkap
3. **Atur Bobot**: Sesuaikan bobot kriteria atau gunakan rekomendasi default
4. **Hitung**: Klik tombol "Hitung Rekomendasi" untuk melihat hasil
5. **Lihat Hasil**: Sistem akan menampilkan ranking rekomendasi dengan skor SAW dan TOPSIS

## License

MIT
