const { event: Event, task: Task } = require('../models');
const { Op } = require('sequelize');

const CalendarController = {
  // Display calendar page with events
  index: async (req, res) => {
    try {
      // Fetch all events from database
      const events = await Event.findAll({ order: [['tanggal', 'ASC']] });

      // Fetch tasks (to show deadlines)
      const tasks = await Task.findAll({
        order: [['tanggalAkhir', 'ASC']],
        include: [
          { association: 'employee', attributes: ['idUser', 'nama'], required: false },
          { association: 'admin', attributes: ['idUser', 'nama'], required: false }
        ]
      });

      // Simple color scheme: Events = Blue, Task Deadlines = Red
      const eventEvents = events.map(ev => ({
        id: `event-${ev.idEvent}`,
        title: ev.namaAcara,
        start: ev.tanggal,
        description: ev.deskripsi,
        location: ev.tempat,
        backgroundColor: '#3b82f6', // Blue for events
        borderColor: '#2563eb',
        extendedProps: { type: 'event' }
      }));

      const taskEvents = tasks.map(t => {
        const owner = t.employee ? t.employee.nama : (t.admin ? t.admin.nama : 'Unassigned');
        return {
          id: `task-${t.idTask}`,
          title: `${t.namaTask} (Deadline)`,
          start: t.tanggalAkhir,
          description: t.deskripsi,
          location: owner,
          backgroundColor: '#ef4444', // Red for task deadlines
          borderColor: '#dc2626',
          extendedProps: { type: 'task', status: t.status }
        };
      });

      const calendarEvents = [...eventEvents, ...taskEvents];

      res.render('calendar/calendar', {
        user: req.session.user,
        activePage: 'calendar',
        events: calendarEvents,
        eventsJson: JSON.stringify(calendarEvents)
      });

    } catch (error) {
      console.error('Error loading calendar:', error);
      req.flash('error', 'Gagal memuat kalender');
      res.redirect('/dashboard');
    }
  },

  // API endpoint to get events (for AJAX if needed)
  getEvents: async (req, res) => {
    try {
      const events = await Event.findAll({
        order: [['tanggal', 'ASC']]
      });

      const calendarEvents = events.map(event => ({
        id: event.idEvent,
        title: event.namaAcara,
        start: event.tanggal,
        description: event.deskripsi,
        location: event.tempat
      }));

      res.json(calendarEvents);

    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  }
};

module.exports = CalendarController;
