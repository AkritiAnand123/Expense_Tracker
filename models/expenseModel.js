const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data/expenses.json");

class Expense {
    constructor(title, amount, category) {
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.date = new Date();
    }

    save() {
        const expenses = Expense.fetchAll();
        expenses.push(this);
        Expense.saveAll(expenses);
    }

    static fetchAll() {
        if (!fs.existsSync(dataPath)) return [];
        const data = fs.readFileSync(dataPath, "utf8");
        if (!data) return [];
        return JSON.parse(data).map(e => { e.date = new Date(e.date); return e; });
    }

    static saveAll(expenses) {
        fs.writeFileSync(dataPath, JSON.stringify(expenses, null, 2));
    }
}

module.exports = Expense;
