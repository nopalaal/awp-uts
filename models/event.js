const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event', {
    idEvent: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    namaAcara: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tempat: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    idProgram: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'program',
        key: 'idProgram'
      }
    }
  }, {
    sequelize,
    tableName: 'event',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEvent" },
        ]
      },
      {
        name: "fk_event_program",
        using: "BTREE",
        fields: [
          { name: "idProgram" },
        ]
      },
    ]
  });
};
