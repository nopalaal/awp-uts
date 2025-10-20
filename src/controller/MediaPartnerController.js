const { mediapartner: MediaPartner } = require('../models');
const { Op } = require('sequelize');

const MediaPartnerController = {
  index: async (req, res) => {
    try {
      const search = req.query.search || '';
      let whereClause = {};
      if (search) {
        whereClause = {
          namaMediaPartner: { [Op.like]: `%${search}%` }
        };
      }
      const mediaPartners = await MediaPartner.findAll({
        where: whereClause,
        order: [['namaMediaPartner', 'ASC']]
      });
      res.render('mediapartner/mediapartner', {
        mediaPartners,
        search,
        activePage: 'mediapartner',
        pageName: 'Media Partner',
      });
    } catch (error) {
      req.flash('error', 'Gagal memuat data Media Partner');
      res.redirect('/dashboard');
    }
  },
  // Form tambah media partner (GET)
  form: (req, res) => {
    res.render('table/mediapartner-form');
  },
  // Proses tambah media partner (POST)
  create: async (req, res) => {
    try {
      const { namaMediaPartner, logoUrl, websiteUrl, kontakEmail } = req.body;
      await MediaPartner.create({ namaMediaPartner, logoUrl, websiteUrl, kontakEmail });
      req.flash('success', 'Media Partner berhasil ditambahkan!');
      res.redirect('/mediapartner');
    } catch (error) {
      req.flash('error', 'Gagal menambah Media Partner: ' + error.message);
      res.redirect('/mediapartner/form');
    }
  },
};

module.exports = MediaPartnerController;
