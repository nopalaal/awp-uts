const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eventgambar', {
    idGambar: {
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
    urlGambar: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    keterangan: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'eventgambar',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idGambar" },
        ]
      },
      {
        name: "idEvent",
        using: "BTREE",
        fields: [
          { name: "idEvent" },
        ]
      },
    ]
  });
};
