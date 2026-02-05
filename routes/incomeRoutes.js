const express = require("express");
const router = express.Router();
const userController = require("../controllers/incomeController");

router.post("/", userController.createIncome);
router.get("/", userController.getAllIncomes);
router.delete("/:id", userController.deleteIncome);
router.put("/:id", userController.updateIncome);

module.exports = router;
