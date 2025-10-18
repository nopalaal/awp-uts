# Panduan Deploy ke Vercel dengan Database

## Opsi 1: Menggunakan PlanetScale (Recommended)

### A. Setup PlanetScale Database

1. **Daftar di PlanetScale**
   - Kunjungi https://planetscale.com/
   - Sign up dengan GitHub account
   - Buat database baru

2. **Setup Database**
   ```bash
   # Install PlanetScale CLI (opsional)
   npm install -g @planetscale/cli
   
   # Login
   pscale auth login
   
   # Create database
   pscale database create mudjarap
   ```

3. **Import Database Schema**
   - Buka PlanetScale Console
   - Gunakan MySQL client atau console untuk import `mudjarap.sql`
   - Atau upload file SQL melalui dashboard

4. **Get Connection String**
   - Dari PlanetScale dashboard, pilih database Anda
   - Klik "Connect"
   - Pilih "Node.js" atau "Sequelize"
   - Copy connection details:
     - Host
     - Username
     - Password
     - Database name

### B. Setup Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login ke Vercel**
   ```bash
   vercel login
   ```

3. **Set Environment Variables**
   ```bash
   # Tambahkan environment variables di Vercel
   vercel env add DB_NAME
   # Masukkan nama database (contoh: mudjarap)
   
   vercel env add DB_USER
   # Masukkan username dari PlanetScale
   
   vercel env add DB_PASS
   # Masukkan password dari PlanetScale
   
   vercel env add DB_HOST
   # Masukkan host dari PlanetScale (contoh: aws.connect.psdb.cloud)
   
   vercel env add DB_PORT
   # Masukkan 3306
   
   vercel env add DB_DIALECT
   # Masukkan mysql
   
   vercel env add SESSION_SECRET
   # Masukkan random string untuk session secret
   ```

   Atau set melalui Vercel Dashboard:
   - Buka project di https://vercel.com/
   - Settings → Environment Variables
   - Tambahkan semua variable di atas

4. **Deploy**
   ```bash
   # Deploy ke Vercel
   vercel
   
   # Atau deploy ke production
   vercel --prod
   ```

## Opsi 2: Menggunakan Railway

### A. Setup Railway Database

1. **Daftar di Railway**
   - Kunjungi https://railway.app/
   - Sign up dengan GitHub

2. **Create New Project**
   - Klik "New Project"
   - Pilih "Provision MySQL"
   - Railway akan membuat MySQL database otomatis

3. **Import Database**
   - Connect ke database menggunakan kredensial dari Railway
   - Import file `mudjarap.sql`

4. **Get Connection Details**
   - Dari Railway dashboard, buka MySQL service
   - Copy connection details:
     - MYSQL_HOST
     - MYSQL_USER
     - MYSQL_PASSWORD
     - MYSQL_DATABASE
     - MYSQL_PORT

### B. Set Environment Variables di Vercel
   - Ikuti langkah 3 dari Opsi 1 (Setup Vercel)
   - Gunakan kredensial dari Railway

## Opsi 3: Menggunakan Aiven

### A. Setup Aiven Database

1. **Daftar di Aiven**
   - Kunjungi https://aiven.io/
   - Sign up (ada free tier)

2. **Create MySQL Service**
   - Dari dashboard, klik "Create Service"
   - Pilih MySQL
   - Pilih region terdekat
   - Pilih free plan

3. **Setup Database**
   - Wait sampai service ready
   - Import `mudjarap.sql` melalui MySQL client

4. **Get Connection String**
   - Dari service overview, copy connection details

### B. Set Environment Variables di Vercel
   - Ikuti langkah 3 dari Opsi 1

## Catatan Penting

### 1. SSL Connection
Kebanyakan cloud database memerlukan SSL. Pastikan config production di `config/config.js` sudah include:
```javascript
dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}
```

### 2. Connection Pooling
Untuk serverless (Vercel), gunakan connection pooling:
```javascript
pool: {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}
```

### 3. Environment Variables yang Diperlukan
Pastikan semua ini di-set di Vercel:
- `DB_NAME` - Nama database
- `DB_USER` - Username database
- `DB_PASS` - Password database
- `DB_HOST` - Host database
- `DB_PORT` - Port database (default: 3306)
- `DB_DIALECT` - mysql
- `SESSION_SECRET` - Random string untuk express-session
- `NODE_ENV` - production

### 4. Testing Locally dengan Production Config
```bash
# Set environment variables di .env file
NODE_ENV=production
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_pass
DB_HOST=your_db_host
DB_PORT=3306
DB_DIALECT=mysql
SESSION_SECRET=your_secret

# Jalankan aplikasi
npm start
```

### 5. Vercel Deployment Commands
```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Check logs
vercel logs

# List deployments
vercel ls
```

## Troubleshooting

### Connection Timeout
- Pastikan IP Vercel di-whitelist di database provider
- PlanetScale tidak perlu whitelist (automatically handled)

### SSL Error
- Tambahkan `rejectUnauthorized: false` di dialectOptions

### Session Error
- Pastikan SESSION_SECRET sudah di-set di environment variables

### Database Schema Issues
- Import ulang schema dari `mudjarap.sql`
- Pastikan semua tables dan data ter-import dengan benar

## Rekomendasi

**Best Option: PlanetScale**
- ✅ Free tier generous
- ✅ MySQL compatible
- ✅ Tidak perlu whitelist IP
- ✅ Serverless (cocok untuk Vercel)
- ✅ Branching database support
- ✅ Easy scaling

**Alternative: Railway**
- ✅ Mudah setup
- ✅ Free tier dengan credit
- ⚠️ Limited free credits

**Alternative: Aiven**
- ✅ Free tier tersedia
- ✅ Multiple cloud provider
- ⚠️ Setup lebih kompleks
