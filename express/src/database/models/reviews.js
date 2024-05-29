module.exports = (sequelize, DataTypes) =>
    sequelize.define("reviews", {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      reply_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      userName: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      numberOfStars: {
        type: DataTypes.INTEGER(10),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false
    });