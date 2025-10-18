const { user: User } = require('./src/models');

async function populateUsers() {
  try {
    // Data domisili Jabodetabek
    const domiciles = [
      'Jakarta Pusat',
      'Jakarta Selatan', 
      'Jakarta Timur',
      'Jakarta Barat',
      'Jakarta Utara',
      'Bogor',
      'Depok',
      'Tangerang',
      'Tangerang Selatan',
      'Bekasi'
    ];

    // Sample users dengan distribusi domisili yang bervariasi
    const sampleUsers = [];
    
    // Generate 50 sample users
    for (let i = 1; i <= 50; i++) {
      const randomDomicile = domiciles[Math.floor(Math.random() * domiciles.length)];
      const randomGender = ['Pria', 'Wanita'][Math.floor(Math.random() * 2)];
      
      sampleUsers.push({
        username: `user${i}`,
        password: 'password123',
        nama: `User Demo ${i}`,
        email: `user${i}@example.com`,
        domisili: randomDomicile,
        gender: randomGender,
        tanggalLahir: `199${Math.floor(Math.random() * 10)}-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`,
        role: 'user'
      });
    }

    console.log('🚀 Memulai populate data users...\n');

    let successCount = 0;
    let skipCount = 0;

    for (const userData of sampleUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({
          where: {
            username: userData.username
          }
        });

        if (existingUser) {
          console.log(`⏭️  User ${userData.username} sudah ada, skip...`);
          skipCount++;
          continue;
        }

        // Create new user
        await User.create(userData);
        console.log(`✓ User ${userData.username} berhasil dibuat - Domisili: ${userData.domisili}`);
        successCount++;

      } catch (err) {
        console.error(`✗ Error membuat user ${userData.username}:`, err.message);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Selesai! ${successCount} user berhasil dibuat`);
    console.log(`⏭️  ${skipCount} user di-skip (sudah ada)`);
    console.log('='.repeat(50));

    // Show distribution
    console.log('\n📊 Distribusi Domisili:');
    const distribution = {};
    for (const user of sampleUsers) {
      distribution[user.domisili] = (distribution[user.domisili] || 0) + 1;
    }
    Object.entries(distribution)
      .sort((a, b) => b[1] - a[1])
      .forEach(([domisili, count]) => {
        console.log(`   ${domisili}: ${count} users`);
      });

    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateUsers();
