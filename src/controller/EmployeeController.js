const { user: User } = require('../models');
const { Op } = require('sequelize');

const EmployeeController = {
  // Display employee list
  index: async (req, res) => {
    try {
      const search = req.query.search || '';
      
      // Build where clause for search
      const whereClause = {
        role: 'employee'
      };
      
      if (search) {
        whereClause[Op.or] = [
          { nama: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { domisili: { [Op.like]: `%${search}%` } }
        ];
      }
      
      // Fetch employees
      const employees = await User.findAll({
        where: whereClause,
        order: [['nama', 'ASC']]
      });

      res.render('employee/employee', {
        user: req.session.user,
        activePage: 'employee',
        employees: employees,
        search: search
      });

    } catch (error) {
      console.error('Error loading employees:', error);
      req.flash('error', 'Gagal memuat data employee');
      res.redirect('/dashboard');
    }
  }
};

module.exports = EmployeeController;
