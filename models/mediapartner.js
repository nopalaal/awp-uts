const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mediapartner', {
    idMediaPartner: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    namaMediaPartner: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "namaMediaPartner"
    },
    logoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    websiteUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kontakEmail: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mediapartner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMediaPartner" },
        ]
      },
      {
        name: "namaMediaPartner",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "namaMediaPartner" },
        ]
      },
    ]
  });
};
