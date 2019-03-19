'use strict';
module.exports = (sequelize, DataTypes) => {
  const College = sequelize.define('College', {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  College.associate = function(models) {
    // associations can be defined here
    College.hasMany(models.Student)
    College.belongsTo(models.University, {as: 'University', foreignKey: 'universityId'})
  };
  return College;
};