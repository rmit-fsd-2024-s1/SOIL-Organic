module.exports = (sequelize, DataTypes) =>
  sequelize.define("carts", {
    cart_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    orderId: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
  