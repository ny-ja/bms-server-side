const BarangayOfficial = require("../models/barangay_official"); // Adjust the path as needed
const logger = require("../config/logger");

const BarangayOfficialController = {
  // Get all barangay officials
  async getAllBarangayOfficials(req, res) {
    try {
      const officials = await BarangayOfficial.findAll();
      res.status(200).json(officials);
      logger.info("Fetched all barangay officials");
    } catch (error) {
      logger.error(`Error fetching barangay officials: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new barangay official
  async createBarangayOfficial(req, res) {
    try {
      const newOfficial = await BarangayOfficial.create(req.body);
      res.status(201).json(newOfficial);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get a single barangay official by ID
  async getBarangayOfficialById(req, res) {
    try {
      const official = await BarangayOfficial.findByPk(req.params.id);
      if (official) {
        res.status(200).json(official);
      } else {
        res.status(404).json({ message: "Barangay official not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a barangay official
  async updateBarangayOfficial(req, res) {
    try {
      const official = await BarangayOfficial.findByPk(req.params.id);
      if (official) {
        await official.update(req.body);
        res.status(200).json({ message: "Barangay official updated successfully" });
      } else {
        res.status(404).json({ message: "Barangay official not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a barangay official
  async deleteBarangayOfficial(req, res) {
    try {
      const official = await BarangayOfficial.findByPk(req.params.id);
      if (official) {
        await official.destroy();
        res.status(200).json({ message: "Barangay official deleted successfully" });
      } else {
        res.status(404).json({ message: "Barangay official not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = BarangayOfficialController;
