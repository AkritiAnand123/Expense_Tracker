const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const expenseController = require("../controllers/expenseController");

router.post("/delete-expense", (req, res) => {
    const index = req.body.expenseIndex; // index sent from form
    const expenses = Expense.fetchAll();

    expenses.splice(index, 1); // remove the selected expense
    const fs = require("fs");
    const path = require("path");
    const dataPath = path.join(__dirname, "../data/expenses.json");

    fs.writeFileSync(dataPath, JSON.stringify(expenses, null, 2));
    res.redirect("/"); // go back to expense list
});

// Budget routes
router.get("/set-budget", expenseController.getBudget);
router.post("/set-budget", expenseController.postBudget);


module.exports = router;
