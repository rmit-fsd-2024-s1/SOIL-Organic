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
      image: {
        type: DataTypes.STRING, 
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT, 
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      sale_price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      save_price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('standard', 'special'),
        allowNull: false
      }
      // special: {
      //   type: DataTypes.BOOLEAN(1),
      //   allowNull: false
      // }
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false
    });
  