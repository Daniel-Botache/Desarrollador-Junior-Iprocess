const { DataTypes } = require('sequelize');
// Exporto una funcion que define el modelo
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Store', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    stock:  {
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