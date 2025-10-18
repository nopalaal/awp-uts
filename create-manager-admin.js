const { user: User } = require('./src/models');
const bcrypt = require('bcrypt');

async function createManagerAndAdmin() {
  try {
    console.log('🚀 Membuat user Manager dan Admin...\n');

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Manager
    const managerData = {
      username: 'manager1',
      password: hashedPassword,
      nama: 'Manager Demo',
      email: 'manager@mudjarap.com',
      domisili: 'Jakarta Selatan',
      gender: 'Pria',
      tanggalLahir: '1990-05-15',
      role: 'manager'
    };

    // Create Admin
    const adminData = {
      username: 'admin1',
      password: hashedPassword,
      nama: 'Admin Demo',
      email: 'admin@mudjarap.com',
      domisili: 'Jakarta Pusat',
      gender: 'Wanita',
      tanggalLahir: '1992-08-20',
      role: 'admin'
    };

    // Check if manager exists
    const existingManager = await User.findOne({
      where: { username: 'manager1' }
    });

    if (!existingManager) {
      const manager = await User.create(managerData);
      console.log(`✅ Manager berhasil dibuat: ${manager.nama} (ID: ${manager.idUser})`);
    } else {
      console.log(`ℹ️  Manager sudah ada: ${existingManager.nama} (ID: ${existingManager.idUser})`);
    }

    // Check if admin exists
    const existingAdmin = await User.findOne({
      where: { username: 'admin1' }
    });

    if (!existingAdmin) {
      const admin = await User.create(adminData);
      console.log(`✅ Admin berhasil dibuat: ${admin.nama} (ID: ${admin.idUser})`);
    } else {
      console.log(`ℹ️  Admin sudah ada: ${existingAdmin.nama} (ID: ${existingAdmin.idUser})`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 INFORMASI LOGIN:');
    console.log('='.repeat(60));
    console.log('Manager:');
    console.log('  Username: manager1');
    console.log('  Password: password123');
    console.log('\nAdmin:');
    console.log('  Username: admin1');
    console.log('  Password: password123');
    console.log('='.repeat(60));
    console.log('\n✅ Sekarang Anda bisa menjalankan: node populate-tasks.js');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit();
  }
}

createManagerAndAdmin();
