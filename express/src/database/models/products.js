module.exports = (sequelize, DataTypes) =>
    sequelize.define("products", {
      item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      item_name: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      quantity: {
        type: DataTypes.STRING(200),
        allowNull: false
      }, 
      special: {
        type: DataTypes.BOOLEAN(1),
        allowNull: false
      }
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false
    });
  