# Calam — Hotel Booking Admin Dashboard Architecture

Dokumen ini menjelaskan arsitektur proyek, struktur folder, dan standar implementasi untuk proyek **Calam Admin Dashboard**. Arsitektur ini disusun berdasarkan `PRD-Calam-Lengkap-v2.md` dan `DESIGN-kraken.md`.

---

## 1. Struktur Folder (Project Structure)
Struktur folder disiapkan secara *scalable* dengan memisahkan kode menjadi modul/fitur independen:

```text
calam/
└── src/
    ├── assets/                 
    ├── components/             
    │   ├── design-system/      
    │   └── shared/             
    ├── config/                 
    ├── features/               
    │   ├── auth/               
    │   ├── dashboard/          
    │   ├── bookings/           
    │   ├── calendar/           
    │   ├── rooms/              
    │   ├── guests/             
    │   ├── check-in-out/       
    │   ├── housekeeping/       
    │   ├── payments/           
    │   ├── revenue/            
    │   ├── reviews/            
    │   ├── staff/              
    │   ├── promotions/         
    │   ├── reports/            
    │   └── settings/           
    ├── hooks/                  
    ├── layouts/                
    ├── lib/                    
    ├── routes/                 
    ├── services/               
    ├── store/                  
    ├── types/                  
    └── utils/                  
```

---

## 2. Tanggung Jawab Folder (Folder Responsibilities)
- **`assets/`**: Menyimpan aset statis seperti logo, ikon SVG khusus, dan font *Kraken-Brand* serta *Kraken-Product*.
- **`components/`**: Komponen UI murni (Dumb Components). Terdiri dari *design-system* (tombol dasar, warna, input) dan *shared* (komponen kompleks yang digunakan di berbagai fitur seperti DataTable).
- **`config/`**: Variabel environment, konstanta global aplikasi, serta konfigurasi tema dasar.
- **`features/`**: Folder terpenting yang berisi setiap modul secara terisolasi. Setiap folder fitur memiliki file routing, UI, API, state, dan hook spesifik mereka sendiri.
- **`hooks/`**: Custom hook React global (contoh: `useWindowSize`, `useClickOutside`). Hook spesifik fitur diletakkan di dalam folder fiturnya.
- **`layouts/`**: Struktur halaman pembungkus, seperti `AdminDashboardLayout` (Sidebar + Header + Content) dan `AuthLayout`.
- **`lib/`**: Konfigurasi dan inisialisasi library eksternal (contoh: setup *Axios* client, konfigurasi *date-fns*).
- **`routes/`**: Pemetaan rute aplikasi, *lazy loading*, dan *Private/Role-Based Guards*.
- **`services/`**: Pemanggilan layanan yang bersifat lintas fitur atau global.
- **`store/`**: State management global aplikasi (contoh: setup *Zustand*, informasi *current user session*, tema UI global).
- **`types/`**: Deklarasi tipe TypeScript global (contoh: `BaseResponse`, `UserRole`).
- **`utils/`**: Fungsi pembantu murni (*pure functions*) yang digunakan secara global, seperti format mata uang IDR atau pemformatan tanggal.

---

## 3. Organisasi Fitur (Feature Boundaries)
Berdasarkan MVP di PRD, arsitektur membagi proyek menjadi 15 *feature boundaries* yang masing-masing merepresentasikan menu di Sidebar atau fungsi inti aplikasi:

1. **`auth`**: Login, sesi pengguna, akses berbasis peran.
2. **`dashboard`**: Ringkasan performa real-time dan tempat injeksi *AI Executive Summary*.
3. **`bookings`**: Manajemen siklus hidup reservasi dan injeksi *AI Cancellation Prediction*.
4. **`calendar`**: Visualisasi *drag & drop* untuk reservasi kamar.
5. **`rooms`**: CRUD kamar, tipe, status, dan injeksi *AI Dynamic Pricing*.
6. **`guests`**: Profil dan catatan khusus tamu.
7. **`check-in-out`**: Alur verifikasi kedatangan dan kepulangan tamu.
8. **`housekeeping`**: Daftar tunggu kebersihan (*room queue*) dan *AI Housekeeping Optimization*.
9. **`payments`**: Pencatatan transaksi dan refund (*Payment Center*).
10. **`revenue`**: Grafik tren dan analisis keuangan, tempat *AI Revenue Forecast*.
11. **`reviews`**: Agregasi ulasan lintas platform dan *AI Review Analysis*.
12. **`staff`**: Pengelolaan shift, profil staf, dan perannya.
13. **`promotions`**: Kode promo, *flash sale*, dan laporan penggunaannya.
14. **`reports`**: Ekspor otomatis laporan PDF/CSV.
15. **`settings`**: Pengaturan fundamental (pajak, integrasi API, tipe kamar standar).

Setiap subfolder di dalam `features/` berisi:
- `api/`: Pemanggilan *endpoint* khusus fitur tersebut.
- `components/`: UI khusus fitur tersebut (tidak dipakai lintas fitur).
- `hooks/`: Logika kustom.
- `pages/`: Tampilan layar (*screens*) lengkap.
- `store/`: State lokal (opsional).
- `types/`: Definisi tipe data spesifik.
- `utils/`: Pembantu khusus fitur.

---

## 4. Arsitektur Dashboard Admin
Aliran hierarki dan dependensi komponen dalam proyek adalah:

```text
Pages (di dalam features/.../pages) 
        ↓
Feature Components (di dalam features/.../components)
        ↓
Shared Components (di dalam src/components/shared)
        ↓
Design System (di dalam src/components/design-system)
        ↓
Services / API (di dalam features/.../api atau src/services)
        ↓
Backend API
```
*Business logic* (pengambilan data, validasi, manipulasi *state*) dikelola pada level `Hooks` atau `Store`, sementara `Pages` dan `Components` bertugas merender UI secara deklaratif.

---

## 5. Implementasi Design System
*Design System Kraken* diimplementasikan secara sistematis pada folder `src/components/design-system/`:
- **Tokens/Variables**: Warna utama (`#7132f5` Kraken Purple), netral (`#686b82` Cool Gray), jarak (spacing), dan radius (maksimal 12px untuk tombol) disimpan sebagai *CSS Variables* atau konfigurasi *Tailwind*.
- **Typography**: Komponen teks dibungkus (contoh: `<Text variant="displayHero">`) untuk memisahkan font *Kraken-Brand* (display) dan *Kraken-Product* (UI).
- **Komponen Inti**:
  - `Button`: Mendukung varian Primary Purple, Purple Outlined, Purple Subtle, White, dan Secondary Gray.
  - `Badge`: Mendukung varian Success (green) dan Neutral (gray) sesuai *design specs*.

---

## 6. Komponen Bersama (Shared Architecture)
Komponen yang digunakan oleh lebih dari satu *Feature* diletakkan di `src/components/shared`. Contohnya:
- `DataTable`: Tabel dinamis dengan dukungan *pagination* (*server-side*), *sorting*, dan pencarian.
- `StatusBadge`: Komponen lencana berstatus yang sudah dipetakan dengan warna Kraken (contoh status: *Confirmed*, *Paid*, *Cleaning*).
- `Modal` & `Drawer`: Kontainer pop-up untuk *form* atau detail (*Booking Detail*, *Room Edit*).
- `DateRangePicker`: Komponen kalender bersama untuk memilih rentang (*Revenue Analytics*, *Reports*).

---

## 7. Arsitektur Halaman (Page/Screen Architecture)
Setiap halaman (*Page*) dikonstruksi tanpa menyimpan *business logic* kompleks di dalam *rendering block* utama.
- **Routing**: Diarahkan dari `routes/` ke file *Page* (contoh: `features/bookings/pages/BookingListPage.tsx`).
- **Data Fetching**: Halaman memanggil custom hook yang membungkus *API call* (contoh: `useGetBookings()`).
- **Pemisahan UI**: Layout halaman merender komponen turunan (seperti `<BookingFilterBar />` dan `<BookingDataTable />`) yang diimpor dari folder *components* di dalam fitur yang sama.

---

## 8. Arsitektur Data/API
- Semua panggilan HTTP dikonfigurasi pada satu *client* inti (misalnya via *Axios* di `src/lib/axios.ts`) untuk mengatur intersep token dan *error handling* global.
- Untuk state server dan *caching*, direkomendasikan menggunakan pustaka seperti **React Query** (`@tanstack/react-query`) guna menangani *loading*, *error state*, dan pembaruan (*mutation*) secara optimistik.
- Pemanggilan API tidak dicampur dalam UI; mereka diekspor sebagai fungsi asinkron (misalnya `fetchRooms`) dari folder `api/`.

---

## 9. Arsitektur Autentikasi & Otorisasi
- **Autentikasi**: JWT Token disimpan secara aman. Login dikelola pada modul `features/auth`. Interseptor *Axios* akan otomatis menambahkan token di *header*, dan menangani *refresh token* atau pengalihan (redirect) ke `/login` jika sesi kedaluwarsa (401).
- **Otorisasi**: 
  - Terdapat 6 peran: *Owner*, *Manager*, *Receptionist*, *Housekeeping*, *Finance*, *Marketing*.
  - Akses dilindungi oleh *Route Guards* tingkat atas (`ProtectedRoute.tsx`) yang mengecek `role` yang dimiliki pengguna aktif terhadap daftar izin di modul.
  - Elemen UI (seperti tombol "Delete" atau menu samping) dirender secara kondisional berdasarkan *role* tersebut.

---

## 10. Strategi State Management
- **Server State**: Dikelola oleh data-fetching library (seperti React Query). Menyimpan dan mencache respons API (contoh: Daftar kamar, daftar ulasan).
- **Global UI State**: Dikelola oleh store ringan (seperti **Zustand** atau **Context API**). Digunakan untuk menyimpan state yang dibagikan luas namun tidak persisten di server (contoh: Status buka/tutup Sidebar, pengaturan bahasa lokal, atau tema/dark mode).
- **Local Form State**: Dikelola dengan **React Hook Form** digabungkan dengan **Zod** untuk validasi skema.

---

## 11. Konvensi Penamaan (Naming Conventions)
- **Folder dan File Utama (non-komponen)**: Menggunakan `kebab-case` (contoh: `check-in-out`, `date-utils.ts`).
- **File Komponen (React)**: Menggunakan `PascalCase` (contoh: `BookingDataTable.tsx`, `PrimaryButton.tsx`).
- **Hooks**: Diawali dengan `use` menggunakan `camelCase` (contoh: `useAuth.ts`, `useFetchRooms.ts`).
- **Fungsi dan Variabel**: Menggunakan `camelCase` (contoh: `calculateTotalRevenue()`).
- **Tipe / Interface (TypeScript)**: Menggunakan `PascalCase` (contoh: `UserRole`, `BookingResponse`).
- **Konstanta Global**: Menggunakan `UPPER_SNAKE_CASE` (contoh: `MAX_RETRY_COUNT`).

---

## 12. Alur Kerja Figma-to-Code (Workflow)
Saat *PNG Mockup* dan *Figma MCP Link* untuk suatu layar diberikan:
1. **Analisis Layar**: Identifikasi data apa yang dibutuhkan, warna/token apa yang digunakan, dan bagian mana yang bisa di-*reuse*.
2. **Pemetaan Design System**: Apakah tombol atau font ini baru atau sudah ada di `design-system`? Jika belum, buat di `design-system`.
3. **Pembangunan Komponen**: Buat atau gunakan kembali komponen dari `shared/` atau `features/.../components/`.
4. **Implementasi Halaman**: Rangkai komponen di dalam file `Page` fitur terkait.
5. **Integrasi Data**: Kaitkan UI statis dengan API hooks atau mock data di dalam fitur.

---

## 13. Keputusan Arsitektur dan Alasannya
- **Kenapa Feature-Based (Screaming Architecture)?** 
  Dashboard ini sangat padat dengan modul (*Booking*, *Housekeeping*, *Review*, dll). Jika semua diletakkan di root `components/` dan `pages/`, direktori akan menumpuk (Ratusan file dalam satu folder). Memecahnya per fitur menjamin modul *Housekeeping* tidak akan saling bergesekan kodenya dengan modul *Finance*.
- **Kenapa memisahkan Design-System dan Shared?**
  Komponen UI dasar (tombol Kraken) dan komponen *business-agnostic* (DataTable) dipakai di mana saja. Mereka harus terbebas dari domain spesifik (seperti logika hotel) untuk mencegah *coupling* (*dependencies* silang yang rumit).
- **Kenapa memisahkan Business Logic dari Page?**
  Mencegah halaman menjadi terlalu berat (*bloated*). Jika API atau *state management* perlu diubah di masa depan, kita hanya mengedit file *Hooks* atau *API*, tanpa harus membedah struktur HTML/UI.
- **Kenapa tidak membuat aplikasi utuh sekarang?**
  Karena instruksi PRD adalah **mempersiapkan arsitektur** dan mengunci konvensi di Fase 1. Eksekusi kode aktual (Tabel aktual, Chart, Form) akan diimplementasikan layar per layar di fase berikutnya (saat *Figma Mockup* disediakan).
