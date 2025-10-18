/**
 * Script untuk membuat user baru dengan password yang di-hash
 * Jalankan dengan: node create-user.js
 */

const bcrypt = require('bcrypt');
const { user: User } = require('./src/models');

async function createUsers() {
  try {
    console.log('Membuat user dummy...');

    // Hash password (admin123)
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const users = [
      {
        username: 'admin',
        password: hashedPassword,
        nama: 'Administrator',
        tanggalLahir: '1990-01-01',
        email: 'admin@mudjarap.com',
        domisili: 'Jakarta',
        gender: 'Pria',
        role: 'admin'
      },
      {
        username: 'manager',
        password: hashedPassword,
        nama: 'Manager User',
        tanggalLahir: '1995-05-15',
        email: 'manager@mudjarap.com',
        domisili: 'Bandung',
        gender: 'Wanita',
        role: 'manager'
      },
      {
        username: 'user',
        password: hashedPassword,
        nama: 'Regular User',
        tanggalLahir: '2000-12-25',
        email: 'user@mudjarap.com',
        domisili: 'Surabaya',
        gender: 'Pria',
        role: 'user'
      }
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ 
        where: { username: userData.username } 
      });
      
      if (existingUser) {
        console.log(`User ${userData.username} sudah ada, skip...`);
        continue;
      }

      await User.create(userData);
      console.log(`✓ User ${userData.username} berhasil dibuat`);
    }

    console.log('\nSelesai! User dummy berhasil dibuat.');
    console.log('\nKredensial login:');
    console.log('==================');
    console.log('Admin:');
    console.log('  Username: admin');
    console.log('  Email: admin@mudjarap.com');
    console.log('  Password: password123');
    console.log('');
    console.log('Manager:');
    console.log('  Username: manager');
    console.log('  Email: manager@mudjarap.com');
    console.log('  Password: password123');
    console.log('');
    console.log('User:');
    console.log('  Username: user');
    console.log('  Email: user@mudjarap.com');
    console.log('  Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createUsers();
