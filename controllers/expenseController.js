const Expense = require("../models/expenseModel");
const Budget = require("../models/budgetModel");

// Show all expenses
exports.getExpenses = (req, res) => {
    const expenses = Expense.fetchAll();
    const monthlyBudget = Number(Budget.getMonthlyBudget()) || 0;

    let totalAmount = 0;
    let monthlyTotal = 0;
    let yearlyTotal = 0;
    let weeklyTotal = 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());

    expenses.forEach(exp => {
        const amount = Number(exp.amount);
        const expDate = new Date(exp.date);

        totalAmount += amount;

        if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear)
            monthlyTotal += amount;

        if (expDate.getFullYear() === currentYear)
            yearlyTotal += amount;

        if (expDate >= weekStart)
            weeklyTotal += amount;
    });

    const savings = monthlyBudget - monthlyTotal;

    res.render("expense-list", {
        expenses,
        totalAmount,
        monthlyTotal,
        yearlyTotal,
        weeklyTotal,
        monthlyBudget,
        savings
    });
};

// Add expense
exports.getAddExpense = (req, res) => res.render("add-expense");

exports.postAddExpense = (req, res) => {
    const { title, amount, category } = req.body;
    const expense = new Expense(title, amount, category);
    expense.save();
    res.redirect("/");
};

// Delete expense
exports.postDeleteExpense = (req, res) => {
    const expenses = Expense.fetchAll();
    expenses.splice(req.body.expenseIndex, 1);
    Expense.saveAll(expenses);
    res.redirect("/");
};

// Budget
exports.getBudget = (req, res) => {
    const monthlyBudget = Budget.getMonthlyBudget() || 0;
    res.render("set-budget", { monthlyBudget });
};

exports.postBudget = (req, res) => {
    const { monthlyBudget } = req.body;
    Budget.saveMonthlyBudget(monthlyBudget);
    res.redirect("/");
};
