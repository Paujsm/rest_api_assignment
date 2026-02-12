//importing Express
const express = require("express");
// Create a new router object to handle sub-routes
const router = express.Router();

// Link this file to the logic inside the users Controller
const userController = require("../controllers/userController");
// Route to CREATE a new users (POST method)
router.post("/", userController.createUser);
// Route to READ all userss (GET method)
router.get("/", userController.getAllUsers);
// Route to UPDATE a specific user by its ID (PUT method)
router.delete("/:id", userController.deleteUser);
// Route to REMOVE a specific user by its ID (DELETE method)
router.put("/:id", userController.updateUser);

// Export the router so it can be used in the main index.js file
module.exports = router;
