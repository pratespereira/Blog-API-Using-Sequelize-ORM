const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
      },
      {
        timestamps: false,
        underscored: true,
        tableName: 'users',
      }
    );
  
    return User;
  };
  
  module.exports = UserModel;