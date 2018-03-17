'use strict';
module.exports = (sequelize, DataTypes) => {
  var FileUpload = sequelize.define('FileUpload', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: UUID,
      type: UUIDV4
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return FileUpload;
};
