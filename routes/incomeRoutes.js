//importing express
const express = require("express");
// Create a new router object to handle sub-routes
const router = express.Router();

// Link this file to the logic inside the incomes Controller
const incomeController = require("../controllers/incomeController");
// Route to CREATE a new incomes (POST method)
router.post("/", incomeController.createIncome);
// Route to READ all incomess (GET method)
router.get("/", incomeController.getAllIncomes);
// Route to UPDATE a specific income by its ID (PUT method)
router.delete("/:id", incomeController.deleteIncome);
// Route to REMOVE a specific income by its ID (DELETE method)
router.put("/:id", incomeController.updateIncome);

// Export the router so it can be used in the main index.js file
module.exports = router;
