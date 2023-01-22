const CategoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      'Category',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          primaryKey: true,
        },
        name: DataTypes.STRING,
      },
      {
        timestamps: false,
        underscored: true,
        tableName: 'categories',
      }
    );
      return Category;
  };
  
  module.exports = CategoryModel;