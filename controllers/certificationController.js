const { Certification, Resident } = require("../models");
const logger = require("../config/logger");

const CertificationController = {
  async getAllCertifications(req, res) {
    try {
      const certifications = await Certification.findAll({
        include: [
          {
            model: Resident,
            as: "resident",
          },
        ],
      });
      res.status(200).json(certifications);
      logger.info("Fetched all certification records");
    } catch (error) {
      logger.error(`Error fetching certification records: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async createCertification(req, res) {
    try {
      const newCertification = await Certification.create(req.body);
      res.status(201).json(newCertification);
      logger.info("Certification record created successfully");
    } catch (error) {
      logger.error(`Error creating certification record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async getCertificationById(req, res) {
    try {
      const certification = await Certification.findByPk(req.params.id, {
        include: [
          {
            model: Resident,
            as: "resident",
          },
        ],
      });
      if (certification) {
        res.status(200).json(certification);
      } else {
        res.status(404).json({ message: "Certification record not found" });
      }
    } catch (error) {
      logger.error(`Error fetching certification record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async updateCertification(req, res) {
    try {
      const certification = await Certification.findByPk(req.params.id);
      if (certification) {
        await certification.update(req.body);
        res
          .status(200)
          .json({ message: "Certification record updated successfully" });
      } else {
        res.status(404).json({ message: "Certification record not found" });
      }
    } catch (error) {
      logger.error(`Error updating certification record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async deleteCertification(req, res) {
    try {
      const certification = await Certification.findByPk(req.params.id);
      if (certification) {
        await certification.destroy();
        res
          .status(200)
          .json({ message: "Certification record deleted successfully" });
      } else {
        res.status(404).json({ message: "Certification record not found" });
      }
    } catch (error) {
      logger.error(`Error deleting certification record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = CertificationController;
