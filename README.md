# Implementasi Algoritma Kriptografi 🔐

Aplikasi React + TypeScript untuk mengimplementasikan algoritma kriptografi klasik dan enkripsi file biner berbasis Vigenère dan turunannya.

## ✨ Fitur

* Enkripsi & dekripsi teks dengan berbagai cipher klasik: Vigenère, Affine, Hill, Playfair, Super Encryption, dll.
* Upload & enkripsi file biner (gambar, audio, dokumen, database).
* Output dalam Base64.
* Download hasil enkripsi sebagai file.
* UI interaktif dan modern berbasis React.

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
* Download: file `.enc` atau `.dat` yang bisa didekripsi kembali

## 📁 Struktur Folder

```
├── components/
│   ├── CipherInput.tsx
│   ├── CipherSelector.tsx
│   └── FileEncryptor.tsx  <-- fitur enkripsi file
├── utils/
│   └── ciphers/
├── pages/
│   └── index.tsx
├── public/
├── README.md
```

## 💠 Teknologi

* React + TypeScript
* Tailwind CSS
* Vite

