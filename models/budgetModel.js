const fs = require("fs");
const path = require("path");
const budgetPath = path.join(__dirname, "../data/budget.json");

class Budget {
    static getMonthlyBudget() {
        if (!fs.existsSync(budgetPath)) return 0;
        const data = fs.readFileSync(budgetPath, "utf8");
        if (!data) return 0;
        return Number(JSON.parse(data).monthlyBudget) || 0;
    }

    static saveMonthlyBudget(amount) {
        fs.writeFileSync(budgetPath, JSON.stringify({ monthlyBudget: Number(amount) }, null, 2));
    }
}

module.exports = Budget;
