'use strict';
module.exports = (sequelize, DataTypes) => {
  const University = sequelize.define('University', {
    name: DataTypes.STRING,
    region: DataTypes.STRING
  }, {});
  University.associate = function(models) {
    // associations can be defined here
    University.hasMany(models.College)
  };
  return University;
};