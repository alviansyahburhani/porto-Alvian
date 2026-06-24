# Dokumen Spesifikasi & Desain Website Portofolio 3D
**Persona:** Frontend Web Developer & Data Science Enthusiast
**Inspirasi UI:** Modern Cyber-Grid / Futuristic Mobile UI Layout (Adaptasi 3D)

---

## 1. Konsep & Filosofi Desain

Dokumen ini merancang sebuah website portofolio interaktif yang menggabungkan estetika **Futuristic Cyber-Grid** (terinspirasi dari tata letak neo-kapsul seluler) dengan teknologi **3D Web Graphics**. Website ini ditujukan untuk merepresentasikan keahlian di bidang *Frontend Web Development* dengan sentuhan interaktif tingkat tinggi.

### Karakteristik Visual:
* **Warna Utama:** Deep Cyber Blue (`#030f26`), Electric Cyan (`#00f0ff`), Neon Purple (`#8a2be2`), dan Pure White (`#ffffff`) untuk keterbacaan teks.
* **Latar Belakang:** Efek grid/ram kawat (*wireframe grid*) semi-transparan yang memberikan kesan kedalaman ruang (3D Depth).
* **Layouting:** Menggunakan struktur kartu melengkung (*capsule-pill borders*) dan overlay 2D di atas kanvas 3D utama (Z-Index layering).

---

## 2. Arsitektur & Teknologi (Tech Stack)

Untuk membangun sistem dengan performa optimal dan animasi 3D yang mulus, teknologi yang dipilih adalah:

| Kategori | Teknologi | Alasan Pemilihan |
| :--- | :--- | :--- |
| **Core Framework** | **Next.js (App Router)** | Mendukung *Static Site Generation* (SSG) untuk kecepatan pemuatan awal dan optimasi SEO yang unggul. |
| **3D Rendering Engine** | **Three.js + React Three Fiber (R3F)** | Mengubah paradigma imperatif Three.js menjadi komponen deklaratif berbasis React, mempermudah manajemen *state* dan *lifecycle*. |
| **3D Helper Suite** | **`@react-three/drei`** | Menyediakan kontrol siap pakai seperti `OrbitControls`, `Stage`, `Text3D`, dan utilitas pemuatan aset performan. |
| **Styling & UI Overlay** | **Tailwind CSS** | Mempercepat pengembangan komponen antarmuka 2D dengan sistem utilitas kelas yang ringan dan responsif. |
| **Animation Engine** | **GSAP (GreenSock) & Framer Motion** | **GSAP** digunakan untuk animasi kamera 3D berbasis *scrolling* (ScrollTrigger), sedangkan **Framer Motion** menangani transisi mikro pada UI 2D. |
| **Asset Optimization** | **`gltfjsx` & Draco Compression** | Mengecilkan ukuran model 3D (`.glb`) hingga 70% dan mengonversinya langsung menjadi komponen React siap pakai. |

---

## 3. Blueprint Tata Letak Visual (Wireframe & Grid System)

Mengadaptasi referensi UI `image_60e6fe.png`, tata letak halaman dirancang menggunakan sistem **CSS Grid 12-Kolom** yang dibagi menjadi 4 baris area (*Rows*). Keseluruhan antarmuka dibungkus dalam bingkai bergaya *cyber-wireframe*.

```text
+-------------------------------------------------------------------+
|                           [ ROW 1: HERO ]                         |
|  (Col 1-5)                     | (Col 6-12)                       |
|  +--------------------------+  |  [ archive by alviansyah ]       |
|  |       NEON RING          |  |                                  |
|  |     +-------------+      |  |     # MY                         |
|  |     |  3D AVATAR  |      |  |     # PORTOFOLIO                 |
|  |     |  (Floating) |      |  |                                  |
|  |     +-------------+      |  |      +------------------------+  |
|  |                          |  |      |     3D PHONE MOCKUP    |  |
|  +--------------------------+  |      |     (Tilted & Spinning)|  |
|                                |      +------------------------+  |
+-------------------------------------------------------------------+
|                      [ ROW 2: BIO & MOTIVATION ]                  |
|  (Col 1-7)                             | (Col 8-12)               |
|  +----------------------------------+  | +----------------------+ |
|  | [ about me ]                     |  | | All start is         | |
|  | "Hello everyone... Namaku        |  | | difficult            | |
|  |  Alvian Syah..."                 |  | | (Marquee Banner)     | |
|  +----------------------------------+  | +----------------------+ |
+-------------------------------------------------------------------+
|                    [ ROW 3: STACK & AFFILIATIONS ]                |
|  (Col 1-5)                             | (Col 6-12)               |
|  +----------------------------------+  | +----------------------+ |
|  | [ member of ]                    |  | |  (O)    (O)    (O)   | |
|  |  (Logo1)  (Logo2)  (Logo3)       |  | |  [=]    [=]    [=]   | |
|  |                                  |  | |   [ my software ]    | |
|  +----------------------------------+  | +----------------------+ |
+-------------------------------------------------------------------+
|                        [ ROW 4: PROJECT DECK ]                    |
|  (Col 1-12)                                                       |
|  +-------------------------------------------------------------+  |
|  |                        [ my projects ]                      |  |
|  |             /===/  /===/  /===/  /===/  /===/               |  |
|  |            /P.1/  /P.2/  /P.3/  /P.4/  /P.5/                |  |
|  |           /===/  /===/  /===/  /===/  /===/                 |  |
|  |             (Stacked 3D Interactive Cards)                  |  |
|  +-------------------------------------------------------------+  |
+-------------------------------------------------------------------+
```

### Aturan Proporsi & Responsivitas (Tailwind Layouting):
1. **Row 1 (Hero Section — `min-h-[50vh]`):**
   * **Desktop (`md:grid-cols-12`):** Kolom 1-5 diisi oleh kanvas *3D Avatar* di dalam lingkaran neon. Kolom 6-12 diisi oleh tipografi judul dan tumpang-tindih (*overlapping*) dengan objek *3D Phone Mockup*.
   * **Mobile (`flex flex-col-reverse`):** Urutan ditumpuk vertikal: Teks perkenalan di atas, 3D Phone di tengah, dan Avatar di paling bawah.
2. **Row 2 (About & Quote — `min-h-[25vh]`):**
   * **Desktop (`md:grid-cols-12`):** Kolom 1-7 untuk boks kaca (*glassmorphism*) "About Me". Kolom 8-12 untuk pita teks *marquee* "All start is difficult".
3. **Row 3 (Affiliations & Tech Stack — `min-h-[25vh]`):**
   * **Desktop (`md:grid-cols-12`):** Kolom 1-5 untuk lencana organisasi/komunitas ("member of"). Kolom 6-12 untuk panggung 3 ikon Web/Data Science (Next.js, Tailwind, Python) beserta sakelar *toggle*.
4. **Row 4 (Project Showcase — `min-h-[40vh]`):**
   * Membentang penuh (`col-span-12`). Area ini dijadikan pusat interaksi *horizontal raycasting* di mana tumpukan kartu proyek bisa ditarik dan digeser secara 3D.

---

## 4. Implementasi Elemen 3D Interaktif

Kanvas 3D diposisikan sebagai *full-screen background fixed* (`fixed inset-0 z-0`), sementara elemen teks dan tombol berjalan di atasnya (`relative z-10`).

### A. Header & Hero Section: 3D Developer Workspace Avatar
* **Deskripsi:** Di sisi kiri atas, terdapat avatar karakter 3D bergaya minimalis atau objek representasi developer.
* **Interaksi:** Objek berputar secara halus (*ambient floating*) berbasis waktu, dan sudut rotasinya sedikit bergeser mengikuti pergerakan kursor mouse (*mouse tracking interaction*).

### B. Mockup Smartphone 3D Interaktif
* **Deskripsi:** Mengadopsi referensi utama, sebuah smartphone 3D ditempatkan di sisi kanan halaman Hero. Layar smartphone memproyeksikan cuplikan antarmuka aplikasi portofolio.
* **Interaksi:** 
    * Saat di-*scroll*, smartphone berputar 360 derajat secara horizontal menggunakan **GSAP ScrollTrigger**.
    * Saat kursor melakukan *hover*, smartphone sedikit condong ke depan memberikan efek kedalaman (*parallax tilt effect*).

### C. 3D Floating Tech Stack & Software Icons
* **Deskripsi:** Ikon software utama (Next.js, Tailwind, VS Code, Nuxt,PHP, Python) dirender sebagai objek 3D bervolume (*extruded 3D meshes*).
* **Interaksi:**
    * Setiap ikon melayang secara independen menggunakan fungsi `Math.sin()` pada sumbu Y.
    * Terdapat tombol *toggle switch* 2D di bawahnya yang jika diklik akan memicu animasi *spin* cepat pada ikon 3D yang bersangkutan.

### D. Galeri Kartu Proyek 3D (Deck Showcase)
* **Deskripsi:** Menampilkan proyek-proyek unggulan dalam bentuk tumpukan kartu 3D (*stacked cards*), ditempatkan di bagian bawah viewport.
* **Interaksi:** Menggunakan **`@react-three/drei` Raycasting**. Pengguna dapat melakukan klik dan geser (*drag & swipe*) untuk melempar kartu terdepan ke belakang, menampilkan kartu proyek berikutnya secara berurutan.

---

## 5. Struktur Folder Proyek (Modular Architecture)

Menerapkan prinsip *Separation of Concerns* (SoC) untuk memisahkan logika UI 2D, komponen 3D, dan konfigurasi animasi.

```text
my-3d-portfolio/
├── public/
│   ├── assets/
│   │   ├── models/          # File .glb/.gltf yang sudah dikompresi (Draco)
│   │   └── textures/        # Baked textures dan HDR maps
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, metadata, & global CSS
│   │   └── page.tsx         # Main entry page (2D Layout Wrapper)
│   ├── components/
│   │   ├── 2d/              # Komponen Antarmuka Tradisional (HTML/Tailwind)
│   │   │   ├── HeroOverlay.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── SoftwarePanel.tsx
│   │   └── 3d/              # Komponen Grafik WebGL (React Three Fiber)
│   │       ├── CanvasWrapper.tsx  # Inisialisasi <Canvas> & Lighting
│   │       ├── PhoneModel.tsx     # Komponen Smartphone 3D
│   │       ├── FloatingIcons.tsx  # Komponen Mesh Ikon Tech Stack
│   │       └── SceneBackground.tsx# Efek Grid dan Partikel Sekitar
│   ├── hooks/
│   │   └── useMousePosition.ts    # Custom hook untuk pelacakan kursor
│   └── styles/
│       └── globals.css      # Tailwind directives & grid-animations
└── next.config.js
```

---

## 6. Strategi Optimasi Performa (Anti-Lag & Mobile-Friendly)

Website 3D rentan terhadap masalah penurunan FPS, terutama pada perangkat seluler. Berikut strategi mitigasi teknisnya:

1.  **Texture Baking:** Seluruh pencahayaan (*lighting*), bayangan (*shadows*), dan refleksi ambient dari lingkungan dipanggang langsung di Blender menjadi satu map tekstur gambar statis. Di R3F, kita menonaktifkan properti `castShadow` dan `receiveShadow` untuk menghemat beban GPU secara masif.
2.  **Conditional Device Rendering:** Menggunakan deteksi *user-agent*. Jika dibuka melalui perangkat mobile berspesifikasi rendah, jumlah partikel background akan dikurangi otomatis, dan efek pasca-pemrosesan (*post-processing shaders* seperti Bloom atau Depth of Field) akan dimatikan.
3.  **Mesh Optimization:** Memastikan seluruh model 3D memiliki jumlah poligon rendah (*low-poly count*), idealnya di bawah 15.000 total segitiga (*triangles*) untuk keseluruhan *scene*.
4.  **Asynchronous Loading State:** Membungkus kanvas 3D dengan React `<Suspense fallback={<Loader2D />} />`. Menampilkan persentase loading aset yang akurat agar pengguna mendapatkan umpan balik visual saat file `.glb` sedang diunduh.

---

## 7. Struktur Konten & Copywriting (Adaptasi Frontend)

* **Section About Me:** "Hello everyone... Namaku Alvian Syah, seorang *Frontend Web Developer* yang berfokus pada rekayasa antarmuka web modern yang bersih, performan, dan memiliki estetika visual tinggi. Berpengalaman dalam menjembatani fungsionalitas kode dengan keindahan desain grafis."
* **Section Core Projects:**
    * **Sisdikop (Sistem Digital Koperasi Merah Putih):** Platform SaaS Multi-Tenant untuk digitalisasi manajemen dan pembukuan unit koperasi.
    * **Web Manajemen Toko & POS (Point Of Sale):** Platform SaaS Multi-Tenant untuk digitalisasi manajemen dan pembukuan unit koperasi.
    * **Clinical Risk Classifier:** Implementasi *Ensemble Learning* (Random Forest & XGBoost) untuk sistem klasifikasi tingkat risiko klinis.
* **Section Membership / Affiliations:** Menampilkan logo-logo ekosistem developer, laboratorium, atau komunitas tempat Anda berkontribusi aktif.