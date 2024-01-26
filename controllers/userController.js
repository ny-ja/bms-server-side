const bcrypt = require("bcrypt");
const User = require("../models/user");
const logger = require("../config/logger");
const { generateToken } = require("../utils/jwt");

const UserController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        where: {
          isAdmin: false
        }
      });
      res.status(200).json(users);
      logger.info("Fetched all users");
    } catch (error) {
      logger.error(`Error fetching users: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const { dateOfBirth } = req.body;

      if (dateOfBirth === "") {
        delete req.body.dateOfBirth; // Remove dateOfBirth if it's empty
      } else if (dateOfBirth && !isValidDate(dateOfBirth)) {
        return res.status(400).json({ message: "Invalid date format" });
      }
      // Create a user with the request body
      const newUser = await User.create(req.body);
      // Do not send back the password hash
      newUser.password = undefined;
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    function isValidDate(dateString) {
      // Regex to check YYYY-MM-DD format
      return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
    }
  },

  // Get a single user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.update(req.body);
        res.status(200).json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async loginUser(req, res) {
    try {
      // Find the user by email and include the password for comparison
      const user = await User.scope("withPassword").findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed: user not found" });
      }

      // Ensure both the provided and stored passwords are available
      if (!req.body.password || !user.password) {
        return res
          .status(401)
          .json({ message: "Authentication failed: missing credentials" });
      }

      // Compare the provided password with the stored hash
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Authentication failed: incorrect password" });
      }

      // Authentication successful
      const token = generateToken(user);
      res.status(200).json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = UserController;
