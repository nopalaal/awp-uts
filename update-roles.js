const { user: User } = require('./src/models');
const { Sequelize } = require('sequelize');

async function updateRoles() {
  try {
    console.log('🔄 Memulai update role dari "manager" ke "employee"...\n');

    // Cari semua user dengan role 'manager'
    const managersCount = await User.count({
      where: {
        role: 'manager'
      }
    });

    if (managersCount === 0) {
      console.log('✅ Tidak ada user dengan role "manager". Database sudah benar!');
      process.exit(0);
    }

    console.log(`📊 Ditemukan ${managersCount} user dengan role "manager"\n`);

    // Update semua user dengan role 'manager' menjadi 'employee'
    const [updatedCount] = await User.update(
      { role: 'employee' },
      {
        where: {
          role: 'manager'
        }
      }
    );

    console.log(`✅ Berhasil update ${updatedCount} user dari "manager" ke "employee"\n`);

    // Tampilkan distribusi role setelah update
    console.log('📊 Distribusi Role Setelah Update:');
    
    const adminCount = await User.count({ where: { role: 'admin' } });
    const employeeCount = await User.count({ where: { role: 'employee' } });
    const userCount = await User.count({ where: { role: 'user' } });

    console.log(`   - Admin: ${adminCount} users`);
    console.log(`   - Employee: ${employeeCount} users`);
    console.log(`   - User: ${userCount} users`);
    console.log(`   - Total: ${adminCount + employeeCount + userCount} users\n`);

    console.log('✅ Update role selesai!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateRoles();
