const { task: Task, user: User } = require('../models');
const { Op } = require('sequelize');
const googleDriveService = require('../services/googleDriveService');
const fs = require('fs');

const TaskController = {
  // Display task page (different views for employee vs admin)
  index: async (req, res) => {
    try {
      const currentUser = req.session.user;
      const search = req.query.search || '';
      
      if (currentUser.role === 'employee') {
        // Employee view: show only their own tasks
        const whereClause = {
          idEmployee: currentUser.idUser
        };
        
        if (search) {
          whereClause.namaTask = { [Op.like]: `%${search}%` };
        }
        
        const myTasks = await Task.findAll({
          where: whereClause,
          include: [
            { model: User, as: 'employee', attributes: ['idUser', 'nama'], required: false },
            { model: User, as: 'admin', attributes: ['idUser', 'nama'], required: false }
          ],
          order: [['tanggalAkhir', 'ASC']]
        });
        
        res.render('task/employee-task', {
          user: currentUser,
          activePage: 'tasks',
          tasks: myTasks,
          search: search,
          messages: req.flash()
        });
        
      } else if (currentUser.role === 'admin') {
        // Admin view: show all tasks with ability to assign
        const whereClause = {};
        
        if (search) {
          whereClause[Op.or] = [
            { namaTask: { [Op.like]: `%${search}%` } },
            { deskripsi: { [Op.like]: `%${search}%` } }
          ];
        }
        
        const allTasks = await Task.findAll({
          where: whereClause,
          include: [
            { model: User, as: 'employee', attributes: ['idUser', 'nama'], required: false },
            { model: User, as: 'admin', attributes: ['idUser', 'nama'], required: false }
          ],
          order: [['tanggalAkhir', 'ASC']]
        });
        
        // Get all employees for dropdown
        const employees = await User.findAll({
          where: { role: 'employee' },
          attributes: ['idUser', 'nama'],
          order: [['nama', 'ASC']]
        });
        
        res.render('task/admin-task', {
          user: currentUser,
          activePage: 'tasks',
          tasks: allTasks,
          employees: employees,
          search: search,
          messages: req.flash()
        });
        
      } else {
        req.flash('error', 'Access denied');
        res.redirect('/dashboard');
      }
      
    } catch (error) {
      console.error('Error loading tasks:', error);
      req.flash('error', 'Gagal memuat tasks');
      res.redirect('/dashboard');
    }
  },
  
  // Employee submit task completion
  // Employee submit task
  submitTask: async (req, res) => {
    try {
      const { idTask } = req.body;
      const currentUser = req.session.user;
      
      if (currentUser.role !== 'employee') {
        req.flash('error', 'Access denied');
        return res.redirect('/tasks');
      }
      
      // Check if file was uploaded
      if (!req.file) {
        req.flash('error', '✗ Gagal submit task: File tidak ditemukan. Silakan upload file terlebih dahulu.');
        return res.redirect('/tasks');
      }
      
      const task = await Task.findOne({
        where: { idTask: idTask, idEmployee: currentUser.idUser }
      });
      
      if (!task) {
        // Delete uploaded file if task not found
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        req.flash('error', '✗ Gagal submit task: Task tidak ditemukan atau Anda tidak memiliki akses.');
        return res.redirect('/tasks');
      }
      
      // Upload file to Google Drive
      const driveUrl = await googleDriveService.uploadFile(
        req.file.path,
        req.file.originalname,
        req.file.mimetype
      );
      
      // Delete local file after successful upload to Google Drive
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
        console.log(`🗑️  Local file deleted: ${req.file.filename}`);
      }
      
      // Update task with Drive URL and change status to 'Selesai'
      await task.update({
        urlContent: driveUrl,
        status: 'Selesai',
        tanggalPenyelesaianAktual: new Date()
      });
      
      req.flash('success', `✓ Task "${task.namaTask}" berhasil disubmit! File "${req.file.originalname}" telah diupload ke Google Drive.`);
      res.redirect('/tasks');
      
    } catch (error) {
      console.error('Error submitting task:', error);
      // Delete uploaded file on error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      req.flash('error', '✗ Gagal submit task: ' + error.message);
      res.redirect('/tasks');
    }
  },
  
  // Admin assign new task
  assignTask: async (req, res) => {
    try {
      const { namaTask, deskripsi, idEmployee, tanggalMulai, tanggalAkhir } = req.body;
      const currentUser = req.session.user;
      
      if (currentUser.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      // Create new task
      const newTask = await Task.create({
        namaTask: namaTask,
        deskripsi: deskripsi,
        idEmployee: idEmployee,
        idAdmin: currentUser.idUser,
        tanggalMulai: tanggalMulai,
        tanggalAkhir: tanggalAkhir,
        status: 'Pending'
      });
      
      // Get employee info for message
      const employee = await User.findByPk(idEmployee);
      
      // Create notification for employee
      const NotificationController = require('./NotificationController');
      await NotificationController.createNotification(
        idEmployee,
        'New Task Assigned',
        `You have been assigned a new task: "${namaTask}". Deadline: ${new Date(tanggalAkhir).toLocaleDateString('id-ID')}`,
        'task',
        newTask.idTask
      );
      
      req.flash('success', `✓ Task "${namaTask}" berhasil di-assign ke ${employee ? employee.nama : 'employee'}!`);
      res.redirect('/tasks');
      
    } catch (error) {
      console.error('Error assigning task:', error);
      req.flash('error', '✗ Gagal assign task: ' + error.message);
      res.redirect('/tasks');
    }
  }
};

module.exports = TaskController;
