const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionDB").sequelize;

const employeedepartment = sequelize.define(
  "employeeDept",
  {
    edId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    DeptName: {
      type: DataTypes.STRING,
      allowNull: true,
    },   
     name:{
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
 
    deptId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: "department",
        key: "deptId",
      }, 
    },
    employeeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

module.exports = employeedepartment;
