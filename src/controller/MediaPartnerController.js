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
        success: req.flash('success'),
        error: req.flash('error'),
      });
    } catch (error) {
      req.flash('error', 'Gagal memuat data Media Partner');
      res.redirect('/dashboard');
    }
  },
  create: async (req, res) => {
    try {
      const { namaMediaPartner, logoUrl, websiteUrl, kontakEmail } = req.body;
      await MediaPartner.create({ namaMediaPartner, logoUrl, websiteUrl, kontakEmail });
      req.flash('success', 'Media Partner berhasil ditambahkan!');
      res.redirect('/mediapartner');
    } catch (error) {
      req.flash('error', 'Gagal tambah Media Partner: ' + error.message);
      res.redirect('/mediapartner');
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await MediaPartner.destroy({ where: { idMediaPartner: id } });
      req.flash('success', 'Media Partner berhasil dihapus!');
      res.redirect('/mediapartner');
    } catch (error) {
      req.flash('error', 'Gagal hapus Media Partner: ' + error.message);
      res.redirect('/mediapartner');
    }
  },
  formEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const mp = await MediaPartner.findByPk(id);
      if (!mp) return res.status(404).json({error:'Media Partner tidak ditemukan'});
      res.json(mp); // untuk AJAX modal
    } catch (error) {
      res.status(500).json({error: 'Gagal mengambil data Media Partner'});
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { namaMediaPartner, logoUrl, websiteUrl, kontakEmail } = req.body;
      await MediaPartner.update({ namaMediaPartner, logoUrl, websiteUrl, kontakEmail }, { where: { idMediaPartner: id } });
      req.flash('success', 'Media Partner berhasil diedit!');
      res.redirect('/mediapartner');
    } catch (error) {
      req.flash('error', 'Gagal edit Media Partner: ' + error.message);
      res.redirect('/mediapartner');
    }
  },
};

module.exports = MediaPartnerController;
