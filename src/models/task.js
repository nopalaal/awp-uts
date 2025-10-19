const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Task = sequelize.define('task', {
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
    idEmployee: {
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
        name: "idEmployee",
        using: "BTREE",
        fields: [
          { name: "idEmployee" },
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

  // Define associations
  Task.associate = function(models) {
    // Association with User for employee
    Task.belongsTo(models.user, {
      foreignKey: 'idEmployee',
      as: 'employee'
    });
    
    // Association with User for admin
    Task.belongsTo(models.user, {
      foreignKey: 'idAdmin',
      as: 'admin'
    });
  };

  return Task;
};
