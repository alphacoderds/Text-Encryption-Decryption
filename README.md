# 🔐 Multi-Layer Encryption & Decryption Web App

Repositori ini berisi kode JavaScript untuk melakukan **enkripsi** dan **dekripsi** teks dengan beberapa lapisan algoritma sekaligus. Dibuat sebagai tugas praktikum / UAS mata kuliah Kriptografi.

## 📚 Deskripsi
Aplikasi web ini memungkinkan pengguna mengenkripsi teks biasa (plaintext) melalui 5 lapisan algoritma:
1. **Caesar Cipher**  
2. **Vigenere Cipher**  
3. **AES (CBC Mode)**  
4. **RC4 Stream Cipher**  
5. **Pseudo Serpent (simulasi)**  

- menampilkan hasil enkripsi tiap lapisan + tombol “Tampilkan” / “Dekripsi” per lapisan
- memunculkan popup hasil enkripsi akhir dan hasil dekripsi akhir secara otomatis

## 🛠️ Teknologi yang Digunakan
- **JavaScript** (ES6)
- **[CryptoJS](https://github.com/brix/crypto-js)** untuk AES, RC4, dsb.
- **SweetAlert2** untuk menampilkan popup hasil
- HTML & CSS dasar untuk form input

## 📂 Struktur Fitur
- `caesarDecrypt()` : mendekripsi teks Caesar Cipher  
- `vigenereDecrypt()` : mendekripsi teks Vigenere  
- `aesDecrypt()` : mendekripsi teks AES CBC  
- `streamDecrypt()` : mendekripsi teks RC4  
- `serpentDecrypt()` : mendekripsi teks Serpent simulasi  

- Event listener `#encryption-form` menangani input, memproses enkripsi berlapis, dan memunculkan popup hasil enkripsi dan dekripsi.

## 🚀 Cara Menggunakan
1. Masukkan **plaintext** dan **key** pada form.
2. Klik tombol **Encrypt** (submit form).
3. Hasil enkripsi tiap lapisan ditampilkan dalam daftar.
4. Klik tombol **Tampilkan** untuk melihat hasil enkripsi per lapisan.
5. Klik tombol **Dekripsi** untuk melihat hasil dekripsi per lapisan.
6. Popup akhir akan menampilkan hasil enkripsi final dan hasil dekripsi lengkap.

> ⚠️ **Catatan:** Ini adalah implementasi sederhana untuk tujuan pembelajaran, bukan untuk keamanan produksi.

## 📦 Instalasi
Pastikan sudah mengimpor library berikut di HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
