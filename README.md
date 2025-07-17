# Website Portofolio - Adam Marchelino

## Description
Portfolio website pribadi yang dibangun dengan React dan Tailwind CSS, menampilkan profil, dan sistem pesan real-time. Website ini dibuat sebagai bagian dari Capstone Project Student Developer Initiative (Hacktiv8 x IBM) dengan bantuan AI IBM Granite untuk mempercepat proses development.

## Technologies Used
- **Frontend**: React dengan (useState, useEffect, useCallback)
- **Styling**: Tailwind CSS untuk responsive design
- **Icons**: Lucide React untuk ikon modern
- **Backend**: Firebase (Authentication & Firestore Database)
- **Build Tool**: Vite dengan environment variables
- **Deployment**: Firebase Hosting

## Features
- **Responsive Navigation**: Navbar dengan hamburger menu dan smooth scroll
- **Hero Section**: Profil dengan foto, deskripsi, dan call-to-action buttons
- **About Section**: Informasi personal
- **Skills Grid**: Showcase teknologi dengan hover animations
- **Projects Gallery**: 3 cards dengan external links
- **Real-time Contact Form**: Form dengan Firebase integration dan live messaging
- **Social Media Integration**: Links ke LinkedIn, GitHub, YouTube, Instagram
- **Performance Optimized**: React.memo, lazy loading, dan optimasi hooks

## Setup Instructions

### Prerequisites
- Node.js (v14 atau lebih baru)
- npm
- Firebase account

### Installation
1. Clone repository ini:
```bash
git clone https://github.com/adammarchelino/webdam-capstonepr
cd [webdam-capstonepr]
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
Buat file `.env` di root directory dan tambahkan:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Jalankan development server:
```bash
npm run dev
```

5. Build untuk production:
```bash
npm run build
```

## AI Support Explanation

### Penggunaan IBM Granite dalam Development

IBM Granite AI membantu secara signifikan dalam proses pengembangan website ini melalui beberapa aspek:

**1. Code Generation & Optimization**
- Granite membantu generate boilerplate code React components
- Optimasi struktur komponen dengan React.memo dan useCallback
- Generate CSS classes Tailwind yang kompleks untuk animasi

**2. Problem Solving**
- Debugging Firebase integration issues
- Menyelesaikan tantangan responsive design
- Troubleshooting masalah state management

**3. Best Practices Implementation**
- Saran pengaplikasian performance optimization
- Code review untuk accessibility improvements
- Saran keamanan untuk Firebase setup

**4. Documentation & Comments**
- Generate inline comments untuk complex functions
- Membantu menulis dokumentasi yang clear
- Struktur README yang comprehensive dan rapi

**5. Feature Enhancement Ideas**
- Saran untuk user experience improvements
- Modern design patterns dan animations
- Real-time features implementation guidance

### Dampak Penggunaan AI
- **Produktivitas**: Menghemat 40-50% waktu development, sangat efisien
- **Code Quality**: Lebih clean dan mudah di rawat
- **Learning**: Mempercepat pemahaman, Learning By doing
- **Debugging**: Mempercepat kesadaran dan tindakan saya

Meski AI sangat membantu, semua code saya pahami dan disesuaikan secara manual untuk memastikan kualitas dan pemahaman yang mendalam, dan tujuan akhir saya adalah mendapat pelajaran, bukan sekedar copy paste.

## Contact
- **Email**: [gammbas7@gmail.com]
- **LinkedIn**: [Adam Marchelino](https://www.linkedin.com/in/adam-marchelino/)

---
*Dibuat sebagai bagian dari Capstone Project Student Developer Initiative (Hacktiv8 x IBM)*
