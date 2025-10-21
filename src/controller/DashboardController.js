const { user: User, task: Task, event: Event, mediapartner: MediaPartner } = require('../models');
const { Op } = require('sequelize');

class DashboardController {
  // Main dashboard
  static async index(req, res) {
    try {
      const user = req.session.user;
      
      // Check if user role is valid
      if (!user.role || (user.role !== 'admin' && user.role !== 'employee')) {
        return res.status(404).render('404', {
          title: '404 - Page Not Found',
          user: null
        });
      }
      
      // Get statistics
      let stats = {};
      
      try {
        // Count total users
        const totalUsers = await User.count();
        
        // Count total media partners
        const totalMediaPartners = await MediaPartner.count();
        
        // Count events for this month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        
        const eventsThisMonth = await Event.count({
          where: {
            tanggal: {
              [Op.between]: [startOfMonth, endOfMonth]
            }
          }
        });
        
        stats = {
          totalUsers,
          totalMediaPartners,
          eventsThisMonth
        };
        
        console.log('Dashboard stats:', stats);
      } catch (statsError) {
        console.error('Error fetching stats:', statsError);
      }

      // Get tasks data - limit to 5 for dashboard with employee and admin names
      let tasks = [];
      try {
        tasks = await Task.findAll({
          limit: 5,
          order: [['tanggalAkhir', 'ASC']],
          include: [
            {
              model: User,
              as: 'employee',
              attributes: ['idUser', 'nama'],
              required: false
            },
            {
              model: User,
              as: 'admin',
              attributes: ['idUser', 'nama'],
              required: false
            }
          ]
        });
        
        // Debug: log tasks with associations
        if (tasks.length > 0) {
          console.log('Sample task data:', JSON.stringify(tasks[0], null, 2));
        }
      } catch (taskError) {
        console.error('Error fetching tasks:', taskError);
      }

      res.render('dashboard/dashboard', {
        title: 'Dashboard - Mudjarap',
        user,
        stats,
        tasks,
        activePage: 'dashboard',
        success: req.flash('success'),
        error: req.flash('error')
      });

    } catch (error) {
      console.error('Dashboard error:', error);
      req.flash('error', 'Terjadi kesalahan saat memuat dashboard');
      res.redirect('/login');
    }
  }

  // Users management (admin only)
  static async users(req, res) {
    try {
      const users = await User.findAllWithInterests();
      const user = req.session.user;
      
      res.render('dashboard/users', {
        title: 'Manajemen User - Mudjarap',
        users,
        user,
        activePage: 'users',
        success: req.flash('success'),
        error: req.flash('error')
      });

    } catch (error) {
      console.error('Users page error:', error);
      req.flash('error', 'Terjadi kesalahan saat memuat data user');
      res.redirect('/dashboard');
    }
  }

  // Delete user (admin only)
  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const currentUser = req.session.user;

      if (currentUser.role !== 'employee') {
        return res.status(403).json({ 
          success: false, 
          error: 'Tidak memiliki akses untuk menghapus user' 
        });
      }
      
      if (currentUser.idUser == userId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Tidak dapat menghapus akun sendiri' 
        });
      }

      const deleted = await User.delete(userId);
      
      if (deleted) {
        res.json({ 
          success: true, 
          message: 'User berhasil dihapus' 
        });
      } else {
        res.status(404).json({ 
          success: false, 
          error: 'User tidak ditemukan atau bukan user biasa' 
        });
      }

    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Terjadi kesalahan saat menghapus user' 
      });
    }
  }

  // Programs page
  static async programs(req, res) {
    try {
      // Add program logic here
      res.render('dashboard/programs', {
        title: 'Program - Mudjarap',
        success: req.flash('success'),
        error: req.flash('error')
      });

    } catch (error) {
      console.error('Programs page error:', error);
      req.flash('error', 'Terjadi kesalahan saat memuat data program');
      res.redirect('/dashboard');
    }
  }

  // Events page
  static async events(req, res) {
    try {
      // Add event logic here
      res.render('dashboard/events', {
        title: 'Event - Mudjarap',
        success: req.flash('success'),
        error: req.flash('error')
      });

    } catch (error) {
      console.error('Events page error:', error);
      req.flash('error', 'Terjadi kesalahan saat memuat data event');
      res.redirect('/dashboard');
    }
  }

  // Tasks page
  static async tasks(req, res) {
    try {
      // Add task logic here
      res.render('dashboard/tasks', {
        title: 'Task - Mudjarap',
        success: req.flash('success'),
        error: req.flash('error')
      });

    } catch (error) {
      console.error('Tasks page error:', error);
      req.flash('error', 'Terjadi kesalahan saat memuat data task');
      res.redirect('/dashboard');
    }
  }

  // Gallery page
  static async gallery(req, res) {
    try {
      // Add gallery logic here
      res.render('dashboard/gallery', {
        title: 'Galeri - Mudjarap',
        success: req.flash('success'),
        error: req.flash('error')
      });

    } catch (error) {
      console.error('Gallery page error:', error);
      req.flash('error', 'Terjadi kesalahan saat memuat galeri');
      res.redirect('/dashboard');
    }
  }

  // Profile page
  static async profile(req, res) {
    try {
      const user = await User.findById(req.session.user.idUser);
      
      res.render('dashboard/profile', {
        title: 'Profil - Mudjarap',
        user,
        success: req.flash('success'),
        error: req.flash('error')
      });

    } catch (error) {
      console.error('Profile page error:', error);
      req.flash('error', 'Terjadi kesalahan saat memuat profil');
      res.redirect('/dashboard');
    }
  }

  // Chart data API endpoints
  static async getChartData(req, res) {
    try {
      const { type } = req.params;
      let data = [];

      switch (type) {
        case 'role':
          data = await User.getRoleStats();
          break;
        case 'domicile':
          data = await User.getDomicileStats();
          break;
        case 'interest':
          data = await User.getInterestStats();
          break;
        case 'age':
          data = await User.getAgeStats();
          break;
        default:
          return res.status(400).json({ error: 'Invalid chart type' });
      }

      res.json({
        success: true,
        data: data,
        chartType: type
      });

    } catch (error) {
      console.error('Chart data error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Terjadi kesalahan saat mengambil data chart' 
      });
    }
  }
}

module.exports = DashboardController;