'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phone: DataTypes.INTEGER
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsTo(models.College, {as: 'College', foreignKey: 'collegeId'})
  };
  return Student;
};