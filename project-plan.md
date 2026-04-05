# Project Plan: Sistem Manajemen Data Pengguna dan Mahasiswa

## 1. Deskripsi Proyek
Proyek ini adalah pengembangan sistem manajemen data yang berfungsi mengelola informasi pengguna dan data mahasiswa. Aplikasi ini dirancang tidak hanya untuk memenuhi standar fungsionalitas CRUD, tetapi juga mengedepankan estetika visual dan pengalaman pengguna (UX) tingkat tinggi.

## 2. Konsep UI/UX & Desain
* **Tema Visual:** **Glassmorphism ("Ice Indigo")** – Mengadaptasi gaya antarmuka iOS/VisionOS dengan efek kaca tembus pandang (*frosted glass*), latar belakang gradasi cerah yang *clean*, dan elemen UI yang minimalis.
* **Pendekatan Desain:** **Mobile-First Responsive Design** – Tampilan dioptimalkan untuk perangkat *mobile* terlebih dahulu (seperti tabel yang bisa di-*scroll* horizontal atau diubah menjadi bentuk *card*), kemudian disesuaikan untuk kenyamanan di layar tablet dan desktop.
* **Aksesibilitas:** Memastikan *contrast ratio* yang baik antara teks dan latar belakang kaca agar data tetap mudah dibaca.

## 3. Teknologi yang Digunakan
* **Framework Frontend:** Next.js (App Router)
* **Styling:** Tailwind CSS v4 (menggunakan skema *import* modern tanpa konfigurasi ekstensif)
* **Backend & Database:** Supabase (PostgreSQL & Supabase Auth)
* **State Management:** React Hooks (`useState`, `useEffect`) dan Supabase Client API
* **Ikon & Tipografi:** Font Inter (bawaan Next.js) dan library ikon pendukung (misal: Lucide React atau Heroicons)

## 4. Struktur Database (Supabase)
Sistem ini menggunakan dua entitas tabel utama:

### A. Tabel `users` (Supabase Auth)
* `id` (UUID): ID unik pengguna
* `email` (String): Alamat email pengguna
* `name` (String): Nama lengkap pengguna
* `is_active` (Boolean): Status akun pengguna
* `created_at` (Timestamp): Waktu registrasi

### B. Tabel `students` (Data Mahasiswa)
* `id` (Integer/UUID): ID unik mahasiswa
* `nim` (String): Nomor Induk Mahasiswa (Unik)
* `nama` (String): Nama lengkap mahasiswa
* `email` (String): Alamat email mahasiswa (Unik)
* `jurusan` (String): Informatika, Sistem Informasi, Teknik Elektro, Manajemen
* `tanggal_lahir` (Date): Tanggal lahir mahasiswa (Opsional)
* `created_at` (Timestamp): Waktu pembuatan data
* `updated_at` (Timestamp): Waktu terakhir data diperbarui

## 5. Ruang Lingkup Fitur (Scope)
1.  **Otentikasi Pengguna:**
    * Halaman Registrasi dengan validasi form.
    * Halaman Login yang aman dengan perlindungan rute (*protected routes*) menuju *Dashboard*.
2.  **Dashboard Utama (Daftar Mahasiswa):**
    * Menampilkan data secara dinamis (Real-time/Fetch dari Supabase).
    * Tabel *glassmorphism* responsif dengan kolom fungsional (Detail, Edit, Hapus).
    * Fitur Pencarian dinamis berdasarkan NIM atau Email.
    * Sistem Paginasi untuk mengatur volume data yang ditampilkan.
3.  **Manajemen Data Mahasiswa (CRUD):**
    * **Create:** Formulir untuk menambah data mahasiswa baru.
    * **Read:** Tampilan detail informasi per mahasiswa.
    * **Update:** Formulir untuk mengedit data mahasiswa yang ada.
    * **Delete:** Aksi penghapusan data dengan pop-up konfirmasi.

## 6. Rencana Fase Pengembangan (Milestones)

### Fase 1: Setup Proyek & Arsitektur Visual
* Inisialisasi Next.js dan Tailwind CSS v4.
* Membersihkan *boilerplate* bawaan dan menyusun struktur folder (`app/`, `components/`, `lib/`).
* Mengatur *layout* utama dengan latar belakang gradasi "Ice Indigo" dan *class utilities* pendukung efek *glassmorphism*.
* Setup proyek di Supabase, membuat tabel `students`, dan menghubungkan *environment variables*.

### Fase 2: Modul Otentikasi
* Slicing UI komponen *Glass Card* untuk halaman Login dan Register.
* Integrasi `supabase.auth.signUp()` dan `signInWithPassword()`.
* Implementasi logika pengalihan halaman (*redirect*) otomatis untuk *user* yang sudah login.

### Fase 3: Dashboard & Tampilan Tabel
* Pembuatan struktur *Navbar* tembus pandang.
* Pembuatan antarmuka Tabel yang dioptimalkan untuk perangkat *mobile* (menggunakan *overflow-x* atau desain berbasis *card*).
* Integrasi data dari Supabase (`.select()`) ke dalam tabel.
* Implementasi logika pencarian (`.ilike()`) dan paginasi (`.range()`).

### Fase 4: Modul Aksi Data Mahasiswa (CUD)
* Pembuatan komponen UI Formulir yang responsif (satu kolom di mobile, multi-kolom di desktop).
* Integrasi fungsi *Insert*, *Update*, dan *Delete* menggunakan API klien Supabase.
* Penanganan *feedback* visual (Notifikasi/Toast sukses atau *error*).

### Fase 5: Finalisasi & Polishing
* *Code Refactoring:* Memastikan kode bersih, pemisahan komponen UI dengan logika (*Custom Hooks*), dan menghindari penumpukan elemen `div`.
* *Cross-device Testing:* Memastikan aplikasi tidak berantakan saat dibuka di layar *smartphone*.
* Penyusunan *README.md* yang berisi panduan lengkap menjalankan aplikasi di lingkungan lokal.