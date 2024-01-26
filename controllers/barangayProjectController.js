const BarangayProject = require("../models/barangay_project"); // Adjust the path as needed
const logger = require("../config/logger");

const BarangayProjectController = {
  // Get all barangay projects
  async getAllBarangayProjects(req, res) {
    try {
      const projects = await BarangayProject.findAll();
      res.status(200).json(projects);
      logger.info("Fetched all barangay projects");
    } catch (error) {
      logger.error(`Error fetching barangay projects: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new barangay project
  async createBarangayProject(req, res) {
    try {
      const newProject = await BarangayProject.create(req.body);
      res.status(201).json(newProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get a single barangay project by ID
  async getBarangayProjectById(req, res) {
    try {
      const project = await BarangayProject.findByPk(req.params.id);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Barangay project not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a barangay project
  async updateBarangayProject(req, res) {
    try {
      const project = await BarangayProject.findByPk(req.params.id);
      if (project) {
        await project.update(req.body);
        res.status(200).json({ message: "Barangay project updated successfully" });
      } else {
        res.status(404).json({ message: "Barangay project not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a barangay project
  async deleteBarangayProject(req, res) {
    try {
      const project = await BarangayProject.findByPk(req.params.id);
      if (project) {
        await project.destroy();
        res.status(200).json({ message: "Barangay project deleted successfully" });
      } else {
        res.status(404).json({ message: "Barangay project not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = BarangayProjectController;
