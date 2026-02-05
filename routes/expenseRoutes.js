const express = require("express");
const router = express.Router();
const userController = require("../controllers/expenseController");

router.post("/", userController.createExpense);
router.get("/", userController.getAllExpenses);
router.put("/:id", userController.updateExpense);
router.delete("/:id", userController.deleteExpense);

module.exports = router;
