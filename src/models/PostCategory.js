const PostCategoryModel = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
      'PostCategory',
      {
        postId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
      },
      {
        timestamps: false,
        underscored: true,
        tableName: 'posts_categories',
      });
      PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
          through: PostCategory,
          foreignKey: 'categoryId',
          otherKey: 'postId',
          as: 'post'
        });
        models.BlogPost.belongsToMany(models.Category, {
          through: PostCategory,
          foreignKey: 'postId',
          otherKey: 'categoryId',
          as: 'categories'
        })
      }
      return PostCategory;
  };
  
  module.exports = PostCategoryModel;