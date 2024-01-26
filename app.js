const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const residentRoutes = require("./routes/residentRoutes");
const barangayOfficialRoutes = require("./routes/barangayOfficialRoutes");
const barangayProjectRoutes = require("./routes/barangayProjectRoutes");
const barangayEventRoutes = require("./routes/barangayEventRoutes");
const cors = require('cors');
const logger = require('./config/logger');

const app = express();
const swaggerDocument = YAML.load("./swagger/swagger.yaml");

app.use(express.json());

// Swagger Middleware for API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", residentRoutes);
app.use("/api/v1", barangayOfficialRoutes);
app.use("/api/v1", barangayProjectRoutes);
app.use("/api/v1", barangayEventRoutes);

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1); // recommended to restart the application in case of uncaught exceptions
});

// Database Connection and Server Start
sequelize
  .sync()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
