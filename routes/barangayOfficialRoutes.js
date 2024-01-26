const express = require("express");
const router = express.Router();
const BarangayOfficialController = require("../controllers/barangayOfficialController");
const authenticate = require("../middlewares/authenticate");

router.get("/barangay-officials", authenticate, BarangayOfficialController.getAllBarangayOfficials);
router.post("/barangay-officials", authenticate, BarangayOfficialController.createBarangayOfficial);
router.get("/barangay-officials/:id", authenticate, BarangayOfficialController.getBarangayOfficialById);
router.put("/barangay-officials/:id", authenticate, BarangayOfficialController.updateBarangayOfficial);
router.delete("/barangay-officials/:id", authenticate, BarangayOfficialController.deleteBarangayOfficial);

module.exports = router;
