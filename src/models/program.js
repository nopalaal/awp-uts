const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('program', {
    idProgram: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    namaProgram: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "namaProgram"
    },
    deskripsiProgram: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    idManager: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'idUser'
      }
    }
  }, {
    sequelize,
    tableName: 'program',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProgram" },
        ]
      },
      {
        name: "namaProgram",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "namaProgram" },
        ]
      },
      {
        name: "idManager",
        using: "BTREE",
        fields: [
          { name: "idManager" },
        ]
      },
    ]
  });
};
