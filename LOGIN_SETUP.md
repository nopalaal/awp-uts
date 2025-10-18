# Panduan Setup Login System - Mudjarap Dashboard

## Prerequisites
- Node.js sudah terinstall
- MySQL server sudah berjalan
- Database 'mudjarap' sudah dibuat

## Setup Database

1. Import file SQL ke database MySQL:
```bash
mysql -u root -p mudjarap < mudjarap.sql
```

Atau import melalui phpMyAdmin dengan file `mudjarap.sql`

## Instalasi Dependencies

```bash
npm install
```

## Konfigurasi Database

1. Copy file `example.env` menjadi `.env`:
```bash
copy example.env .env
```

2. Edit file `.env` dan sesuaikan konfigurasi database:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mudjarap
DB_DIALECT=mysql
SESSION_SECRET=your-secret-key-here
```

## Setup User (Opsional)

Jika Anda ingin membuat user dummy untuk testing, jalankan:

```bash
node create-user.js
```

Script ini akan membuat 3 user dengan kredensial berikut:

### Admin
- Username: `admin`
- Email: `admin@mudjarap.com`
- Password: `password123`
- Role: admin

### Manager
- Username: `manager`
- Email: `manager@mudjarap.com`
- Password: `password123`
- Role: manager

### User
- Username: `user`
- Email: `user@mudjarap.com`
- Password: `password123`
- Role: user

## Menjalankan Aplikasi

```bash
node app.js
```

Aplikasi akan berjalan di: `http://localhost:3001`

## Fitur Login

### Halaman Login
Akses: `http://localhost:3001/login`

Anda dapat login menggunakan:
- **Username** ATAU **Email**
- **Password**

### Fitur Keamanan
- Password di-hash menggunakan bcrypt
- Session-based authentication
- Flash messages untuk error/success
- Middleware untuk proteksi route

### Flow Authentication

1. User mengakses halaman login (`/login`)
2. User memasukkan username/email dan password
3. Sistem memverifikasi kredensial dari database
4. Jika valid, user di-redirect ke dashboard dengan session aktif
5. Jika tidak valid, user melihat error message

### Logout

Untuk logout, akses: `http://localhost:3001/logout`

## Struktur File Terkait Login

```
src/
├── controller/
│   ├── AuthController.js       # Controller untuk autentikasi
│   └── middleware/
│       └── auth.js              # Middleware proteksi route
├── models/
│   └── user.js                  # Model User dengan method login
└── routes/
    └── login.js                 # Routes untuk login/logout

views/
└── pages/
    └── login/
        └── login.ejs            # Halaman login
```

## Troubleshooting

### Error: Cannot find module 'bcrypt'
```bash
npm install bcrypt
```

### Error: Connection refused (Database)
- Pastikan MySQL server berjalan
- Cek konfigurasi di file `.env`
- Pastikan database 'mudjarap' sudah dibuat

### Error: Table 'user' doesn't exist
- Import ulang file `mudjarap.sql`
- Pastikan kolom `password` ada di tabel user

### Flash messages tidak muncul
- Pastikan `express-session` dan `express-flash` sudah terinstall
- Cek konfigurasi session di `app.js`

## Keamanan

⚠️ **PENTING untuk Production:**
- Ganti `SESSION_SECRET` dengan string random yang kuat
- Jangan commit file `.env` ke repository
- Gunakan HTTPS untuk production
- Implementasi rate limiting untuk prevent brute force
- Tambahkan captcha jika diperlukan
- Set secure cookie options untuk production

## Pengembangan Selanjutnya

Fitur yang bisa ditambahkan:
- [ ] Forgot password / Reset password
- [ ] Email verification
- [ ] Remember me functionality
- [ ] Two-factor authentication (2FA)
- [ ] Login history/audit log
- [ ] Account lockout after failed attempts
- [ ] Social login (Google, Facebook, etc.)
- [ ] Role-based access control (RBAC) yang lebih kompleks

## Kontak

Jika ada pertanyaan atau masalah, silakan hubungi tim developer.
