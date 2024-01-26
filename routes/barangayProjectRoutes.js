const express = require("express");
const router = express.Router();
const BarangayProjectController = require("../controllers/barangayProjectController");
const authenticate = require("../middlewares/authenticate");

router.get("/barangay-projects", authenticate, BarangayProjectController.getAllBarangayProjects);
router.post("/barangay-projects", authenticate, BarangayProjectController.createBarangayProject);
router.get("/barangay-projects/:id", authenticate, BarangayProjectController.getBarangayProjectById);
router.put("/barangay-projects/:id", authenticate, BarangayProjectController.updateBarangayProject);
router.delete("/barangay-projects/:id", authenticate, BarangayProjectController.deleteBarangayProject);

module.exports = router;
