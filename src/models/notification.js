const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const Notification = sequelize.define('notification', {
    idNotification: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'idUser'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('task', 'event', 'system'),
      allowNull: false
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    relatedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'ID of related task/event'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'notification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idNotification" },
        ]
      },
      {
        name: "idUser",
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
    ]
  });

  Notification.associate = function(models) {
    Notification.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'idUser'
    });
  };

  return Notification;
};
