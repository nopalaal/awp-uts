const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('interest', {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'idUser'
      }
    },
    interest: {
      type: DataTypes.STRING(225),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'interest',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUser" },
          { name: "interest" },
        ]
      },
      {
        name: "idUser_idx",
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
    ]
  });
};
