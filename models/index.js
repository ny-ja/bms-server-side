const sequelize = require("../config/database");
const Resident = require("./resident");
const Certification = require("./certification");

// Association between Resident and Certification
Resident.hasMany(Certification, { foreignKey: "residentID", as: "certifications" });
Certification.belongsTo(Resident, { foreignKey: "residentID", as: "resident" });

module.exports = {
  sequelize,
  Resident,
  Certification,
};
