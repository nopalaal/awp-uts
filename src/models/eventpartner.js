const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eventpartner', {
    idEventPartner: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idEvent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'event',
        key: 'idEvent'
      }
    },
    idMediaPartner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mediapartner',
        key: 'idMediaPartner'
      }
    }
  }, {
    sequelize,
    tableName: 'eventpartner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEventPartner" },
        ]
      },
      {
        name: "idEvent",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEvent" },
          { name: "idMediaPartner" },
        ]
      },
      {
        name: "idMediaPartner",
        using: "BTREE",
        fields: [
          { name: "idMediaPartner" },
        ]
      },
    ]
  });
};
