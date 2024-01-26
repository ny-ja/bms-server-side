const Resident = require("../models/resident");
const logger = require("../config/logger");

const ResidentController = {
  // Get all residents
  async getAllResidents(req, res) {
    try {
      const residents = await Resident.findAll();
      res.status(200).json(residents);
      logger.info("Fetched all residents");
    } catch (error) {
      logger.error(`Error fetching residents: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new resident
  async createResident(req, res) {
    try {
      const newResident = await Resident.create(req.body);
      res.status(201).json(newResident);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get a single resident by ID
  async getResidentById(req, res) {
    try {
      const resident = await Resident.findByPk(req.params.id);
      if (resident) {
        res.status(200).json(resident);
      } else {
        res.status(404).json({ message: "Resident not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a resident
  async updateResident(req, res) {
    try {
      const resident = await Resident.findByPk(req.params.id);
      if (resident) {
        await resident.update(req.body);
        res.status(200).json({ message: "Resident updated successfully" });
      } else {
        res.status(404).json({ message: "Resident not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a resident
  async deleteResident(req, res) {
    try {
      const resident = await Resident.findByPk(req.params.id);
      if (resident) {
        await resident.destroy();
        res.status(200).json({ message: "Resident deleted successfully" });
      } else {
        res.status(404).json({ message: "Resident not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ResidentController;
