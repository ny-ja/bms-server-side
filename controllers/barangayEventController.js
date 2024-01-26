const BarangayEvent = require("../models/barangay_event"); // Adjust the path as needed
const logger = require("../config/logger");

const BarangayEventController = {
  // Get all barangay events
  async getAllBarangayEvents(req, res) {
    try {
      const events = await BarangayEvent.findAll();
      res.status(200).json(events);
      logger.info("Fetched all barangay events");
    } catch (error) {
      logger.error(`Error fetching barangay events: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new barangay event
  async createBarangayEvent(req, res) {
    try {
      const newEvent = await BarangayEvent.create(req.body);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get a single barangay event by ID
  async getBarangayEventById(req, res) {
    try {
      const event = await BarangayEvent.findByPk(req.params.id);
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: "Barangay event not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a barangay event
  async updateBarangayEvent(req, res) {
    try {
      const event = await BarangayEvent.findByPk(req.params.id);
      if (event) {
        await event.update(req.body);
        res.status(200).json({ message: "Barangay event updated successfully" });
      } else {
        res.status(404).json({ message: "Barangay event not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a barangay event
  async deleteBarangayEvent(req, res) {
    try {
      const event = await BarangayEvent.findByPk(req.params.id);
      if (event) {
        await event.destroy();
        res.status(200).json({ message: "Barangay event deleted successfully" });
      } else {
        res.status(404).json({ message: "Barangay event not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = BarangayEventController;
