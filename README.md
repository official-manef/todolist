# TugasKu — To-do list

Aplikasi web sederhana untuk mencatat dan mengelola tugas harian. Dibangun dengan React, TypeScript, dan Vite.

## Fitur

- Menambahkan tugas.
- Menandai tugas selesai atau belum selesai.
- Menghapus tugas.
- Menampilkan jumlah tugas yang selesai dibandingkan dengan jumlah seluruh tugas.
- Menyimpan daftar tugas di `localStorage` pada browser yang digunakan.

Aplikasi ini tidak memiliki backend atau sinkronisasi antarperangkat. Data tersimpan di browser, bukan di server.

## Menjalankan aplikasi

Prasyarat: Node.js dan npm yang kompatibel dengan dependensi proyek.

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal.

## Pemeriksaan dan build

Skrip yang tersedia di `package.json`:

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` menjalankan pemeriksaan TypeScript lalu membuat build Vite. Jalankan `npm run preview` setelah build untuk menyajikan hasil build secara lokal.

Repositori ini tidak mendefinisikan skrip pengujian otomatis. Perintah di atas dicantumkan sebagai skrip yang tersedia, bukan sebagai hasil pengujian yang telah dijalankan.

## Struktur utama

- `src/App.tsx` — antarmuka dan logika daftar tugas.
- `src/main.tsx` — titik masuk aplikasi React.
- `src/index.css` — gaya global.
- `index.html` — dokumen HTML utama.
- `vite.config.ts`, `tsconfig*.json`, `eslint.config.js` — konfigurasi alat pengembangan, TypeScript, dan lint.

## Batasan

Daftar tugas disimpan menggunakan `localStorage`, sehingga tidak dibagikan dengan pengguna atau browser lain. Fitur akun, sinkronisasi, pengeditan tugas, dan pengelompokan tugas tidak diimplementasikan.
