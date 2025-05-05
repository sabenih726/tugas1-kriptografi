# Implementasi Algoritma Kriptografi 🔐

Aplikasi React + TypeScript untuk mengimplementasikan algoritma kriptografi klasik dan enkripsi file biner berbasis Vigenère dan turunannya.

## ✨ Fitur Utama

- 🔠 Enkripsi & dekripsi pesan teks menggunakan:
  - Vigenère Cipher (standar, Auto-key, Extended/ASCII)
  - Affine Cipher
  - Hill Cipher
  - Playfair Cipher
  - Super Encryption
- 📁 Enkripsi & dekripsi file biner:
  - Mendukung semua tipe file (jpg, pdf, docx, mp3, dll.)
  - File terenkripsi tidak bisa dibuka tanpa didekripsi terlebih dahulu
- 📦 Unduh hasil enkripsi sebagai file `.enc`, `.dat`, atau format lainnya
- 🧾 Output cipher ditampilkan dalam bentuk Base64
- 🎨 UI responsif, dibangun dengan React, Tailwind, dan Radix UI

## 🚀 Cara Menjalankan

1. **Clone repositori**

   ```bash
   git clone https://github.com/sabenih726/Implementasi-Algoritma-Kriptografi.git
   cd Implementasi-Algoritma-Kriptografi
   ```

2. **Instal dependensi**

   ```bash
   npm install
   ```

3. **Jalankan server lokal**

   ```bash
   npm run dev
   ```

4. Buka di browser:

   ```
   http://localhost:3000
   ```

## 🥪 Contoh

* Input: `plaintext` atau file `.jpg`
* Output: Base64 string hasil enkripsi
* Download: Hasil sebagai file .enc, .dat, atau format bebas
* Dekripsi: Mengembalikan file ke bentuk dan format aslinya

## 📁 Struktur Folder

```
Implementasi-Algoritma-Kriptografi/
├── src/
│   ├── components/            # Komponen UI
│   ├── ciphers/               # Implementasi algoritma
│   ├── hooks/                 # React hooks (jika ada)
│   ├── lib/                   # Fungsi pendukung (helper, utilitas)
│   ├── pages/                 # Halaman utama aplikasi
│   └── main.tsx              # Entry point aplikasi
├── public/                   # Aset publik (favicon, og-image)
├── index.html                # Halaman HTML utama
├── package.json              # Dependensi & konfigurasi npm
├── tailwind.config.ts        # Konfigurasi Tailwind CSS
└── vite.config.ts            # Konfigurasi Vite 

## 💠 Teknologi

* React + TypeScript
* Tailwind CSS
* Vite

📜 Lisensi
Proyek ini dikembangkan untuk keperluan akademik. Silakan modifikasi atau kembangkan lebih lanjut sesuai kebutuhan tugas atau penelitian Anda.
