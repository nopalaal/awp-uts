const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    idUser: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tanggalLahir: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    domisili: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('Pria','Wanita','Lainnya'),
      allowNull: true
    },
    photo_profile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin','employee','user'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });

  // Instance method untuk verifikasi password
  User.prototype.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  // Static method untuk mencari user berdasarkan username atau email
  User.findByLogin = async function(identifier) {
    return await this.findOne({
      where: {
        [Sequelize.Op.or]: [
          { username: identifier },
          { email: identifier }
        ]
      }
    });
  };

  // Static method untuk mendapatkan statistik domisili user
  User.getDomicileStats = async function() {
    try {
      const stats = await this.findAll({
        attributes: [
          'domisili',
          [sequelize.fn('COUNT', sequelize.col('idUser')), 'total']
        ],
        where: {
          domisili: {
            [Sequelize.Op.ne]: null,
            [Sequelize.Op.ne]: ''
          },
          role: 'user' // hanya hitung user biasa
        },
        group: ['domisili'],
        raw: true
      });

      return stats.map(stat => ({
        domisili: stat.domisili,
        total: parseInt(stat.total)
      }));
    } catch (error) {
      console.error('Error getting domicile stats:', error);
      return [];
    }
  };

  return User;
};
