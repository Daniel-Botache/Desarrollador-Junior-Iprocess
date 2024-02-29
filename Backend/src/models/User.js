const { DataTypes } = require('sequelize');
// Exporto una funcion que define el modelo
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    tel:  {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
    {
      freezeTableName: true,
      timestamps: false,
    }
  )
};