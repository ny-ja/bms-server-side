const express = require("express");
const router = express.Router();
const CertificationController = require("../controllers/certificationController");
const authenticate = require("../middlewares/authenticate");

router.get("/certifications", authenticate, CertificationController.getAllCertifications);
router.post("/certifications", authenticate, CertificationController.createCertification);
router.get("/certifications/:id", authenticate, CertificationController.getCertificationById);
router.put("/certifications/:id", authenticate, CertificationController.updateCertification);
router.delete("/certifications/:id", authenticate, CertificationController.deleteCertification);

module.exports = router;
