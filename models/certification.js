const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Certification = sequelize.define(
  "Certification",
  {
    residentID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "Residents",
        key: "id",
      },
    },
    certificationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    validUntil: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    issuedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purpose: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

module.exports = Certification;
