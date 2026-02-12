//importing express
const express = require("express");
// Create a new router object to handle sub-routes
const router = express.Router();

// Link this file to the logic inside the Expense Controller
const expenseController = require("../controllers/expenseController");
// Route to CREATE a new expense (POST method)
router.post("/", expenseController.createExpense);
// Route to READ all expenses (GET method)
router.get("/", expenseController.getAllExpenses);
// Route to UPDATE a specific expense by its ID (PUT method)
router.put("/:id", expenseController.updateExpense);
// Route to REMOVE a specific expense by its ID (DELETE method)
router.delete("/:id", expenseController.deleteExpense);

// Export the router so it can be used in the main index.js file
module.exports = router;
