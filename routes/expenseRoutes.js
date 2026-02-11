const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

// Home page – list expenses
router.get("/", expenseController.getExpenses);

// Add expense form
router.get("/add-expense", expenseController.getAddExpense);

// Add expense (POST)
router.post("/add-expense", expenseController.postAddExpense);

// Delete expense
router.post("/delete-expense", expenseController.postDeleteExpense);

// Budget routes
router.get("/set-budget", expenseController.getBudget);
router.post("/set-budget", expenseController.postBudget);

module.exports = router;
