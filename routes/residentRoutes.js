const express = require("express");
const router = express.Router();
const ResidentController = require("../controllers/residentController");
const authenticate = require("../middlewares/authenticate");

router.get("/residents", authenticate, ResidentController.getAllResidents);
router.post("/residents", authenticate, ResidentController.createResident);
router.get("/residents/:id", authenticate, ResidentController.getResidentById);
router.put("/residents/:id", authenticate, ResidentController.updateResident);
router.delete("/residents/:id", authenticate, ResidentController.deleteResident);

module.exports = router;
