const { user: User } = require('../models');
const { Op } = require('sequelize');

const UserController = {
  // Display user list
  index: async (req, res) => {
    try {
      const search = req.query.search || '';
      
      // Build where clause for search
      const whereClause = {
        role: 'user'
      };
      
      if (search) {
        whereClause[Op.or] = [
          { nama: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { domisili: { [Op.like]: `%${search}%` } }
        ];
      }
      
      // Fetch users
      const users = await User.findAll({
        where: whereClause,
        order: [['nama', 'ASC']]
      });

      res.render('users/users', {
        user: req.session.user,
        activePage: 'users',
        users: users,
        search: search
      });

    } catch (error) {
      console.error('Error loading users:', error);
      req.flash('error', 'Gagal memuat data users');
      res.redirect('/dashboard');
    }
  }
};

module.exports = UserController;
