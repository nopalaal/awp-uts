const { task: Task, user: User } = require('./src/models');

async function populateTasks() {
  try {
    console.log('🚀 Memulai populate data tasks...\n');

    // Get employees and admins from database
    const employees = await User.findAll({
      where: { role: 'employee' }
    });

    const admins = await User.findAll({
      where: { role: 'admin' }
    });

    if (employees.length === 0) {
      console.log('⚠️  Tidak ada user dengan role employee. Silakan buat user employee terlebih dahulu.');
      return;
    }

    console.log(`✅ Ditemukan ${employees.length} employee(s) dan ${admins.length} admin(s)\n`);

    // Sample task data
    const taskNames = [
      'Membuat Desain Landing Page',
      'Implementasi API Backend',
      'Setup Database Production',
      'Testing Fitur Login',
      'Optimasi Performance',
      'Membuat Dokumentasi API',
      'Code Review Sprint 1',
      'Deploy ke Server Staging',
      'Fix Bug Registration',
      'Implementasi Payment Gateway',
      'Membuat Dashboard Analytics',
      'Setup CI/CD Pipeline',
      'Security Audit',
      'Implementasi Email Notification',
      'Membuat Unit Test',
      'Refactoring Code',
      'Update Dependencies',
      'Implementasi Dark Mode',
      'Membuat Mobile Responsive',
      'SEO Optimization'
    ];

    const descriptions = [
      'Membuat desain UI/UX yang menarik dan user-friendly',
      'Implementasi REST API dengan Node.js dan Express',
      'Setup dan konfigurasi database MySQL di production',
      'Testing end-to-end untuk fitur autentikasi',
      'Optimasi query database dan loading time',
      'Dokumentasi lengkap untuk semua endpoint API',
      'Review kode dari tim developer untuk sprint pertama',
      'Deploy aplikasi ke environment staging untuk testing',
      'Memperbaiki bug pada proses registrasi user',
      'Integrasi dengan payment gateway (Midtrans/Xendit)',
      'Membuat dashboard untuk menampilkan analytics data',
      'Setup continuous integration dan deployment',
      'Audit keamanan aplikasi dan fix vulnerability',
      'Implementasi sistem notifikasi via email',
      'Membuat unit test untuk semua function penting',
      'Refactoring code untuk meningkatkan maintainability',
      'Update semua dependencies ke versi terbaru',
      'Implementasi fitur dark mode pada aplikasi',
      'Membuat tampilan responsive untuk mobile device',
      'Optimasi SEO untuk meningkatkan ranking'
    ];

    const statuses = ['Pending', 'In Progress', 'Selesai', 'Revisi'];

    const sampleTasks = [];
    
    // Generate tasks
    for (let i = 0; i < taskNames.length; i++) {
      const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
      const randomAdmin = admins.length > 0 ? admins[Math.floor(Math.random() * admins.length)] : null;
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Random date in the next 30 days for start date
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
      
      // End date 7-30 days after start date
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7 + Math.floor(Math.random() * 23));
      
      // If status is 'Selesai', add actual completion date
      const tanggalPenyelesaianAktual = randomStatus === 'Selesai' ? new Date() : null;

      sampleTasks.push({
        namaTask: taskNames[i],
        deskripsi: descriptions[i],
        urlContent: `https://example.com/task/${i + 1}`,
        tanggalMulai: startDate,
        tanggalAkhir: endDate,
        status: randomStatus,
        idEmployee: randomEmployee.idUser,
        idAdmin: randomAdmin ? randomAdmin.idUser : null,
        tanggalPenyelesaianAktual: tanggalPenyelesaianAktual
      });
    }

    let successCount = 0;
    let errorCount = 0;

    console.log('📝 Memasukkan data tasks ke database...\n');

    for (const taskData of sampleTasks) {
      try {
        await Task.create(taskData);
        successCount++;
        console.log(`✅ Task "${taskData.namaTask}" berhasil ditambahkan (Status: ${taskData.status})`);
      } catch (error) {
        errorCount++;
        console.log(`❌ Gagal menambahkan task "${taskData.namaTask}":`, error.message);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 HASIL POPULATE TASKS:');
    console.log('='.repeat(60));
    console.log(`✅ Berhasil: ${successCount} tasks`);
    console.log(`❌ Gagal: ${errorCount} tasks`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Error saat populate tasks:', error);
  } finally {
    process.exit();
  }
}

// Run the populate function
populateTasks();
