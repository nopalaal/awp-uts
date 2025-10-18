/**
 * Script untuk test dan update password user
 */

const bcrypt = require('bcrypt');
const { user: User } = require('./src/models');

async function updatePasswords() {
  try {
    console.log('Test dan Update Password User...\n');

    // Hash password baru
    const newPassword = 'password123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    console.log('New hashed password:', hashedPassword);
    console.log('');

    // Update semua user dengan password baru
    const users = ['admin', 'manager', 'user'];
    
    for (const username of users) {
      const user = await User.findOne({ where: { username } });
      
      if (user) {
        // Update password tanpa trigger hooks
        await User.update(
          { password: hashedPassword },
          { 
            where: { username },
            individualHooks: false // Skip hooks agar tidak double-hash
          }
        );
        
        console.log(`✓ Password untuk ${username} berhasil diupdate`);
      } else {
        console.log(`✗ User ${username} tidak ditemukan`);
      }
    }

    // Test verifikasi
    console.log('\n=== Testing Password Verification ===');
    const testUser = await User.findOne({ where: { username: 'admin' } });
    const isValid = await bcrypt.compare('password123', testUser.password);
    console.log('Password "password123" valid?', isValid);
    
    console.log('\n✅ Selesai! Silakan coba login dengan:');
    console.log('Username: admin');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updatePasswords();
