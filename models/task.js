const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task', {
    idTask: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    namaTask: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    urlContent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tanggalMulai: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tanggalAkhir: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Pending','In Progress','Selesai','Revisi'),
      allowNull: false,
      defaultValue: "Pending"
    },
    idManager: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'idUser'
      }
    },
    idAdmin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'idUser'
      }
    },
    tanggalPenyelesaianAktual: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'task',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTask" },
        ]
      },
      {
        name: "idManager",
        using: "BTREE",
        fields: [
          { name: "idManager" },
        ]
      },
      {
        name: "idAdmin",
        using: "BTREE",
        fields: [
          { name: "idAdmin" },
        ]
      },
    ]
  });
};
