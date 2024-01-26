const express = require("express");
const router = express.Router();
const BarangayEventController = require("../controllers/barangayEventController");
const authenticate = require("../middlewares/authenticate");

router.get("/barangay-events", authenticate, BarangayEventController.getAllBarangayEvents);
router.post("/barangay-events", authenticate, BarangayEventController.createBarangayEvent);
router.get("/barangay-events/:id", authenticate, BarangayEventController.getBarangayEventById);
router.put("/barangay-events/:id", authenticate, BarangayEventController.updateBarangayEvent);
router.delete("/barangay-events/:id", authenticate, BarangayEventController.deleteBarangayEvent);

module.exports = router;
