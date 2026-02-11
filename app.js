const express = require("express");
const path = require("path");

const expenseRoutes = require("./routes/expenseRoutes"); // use this router

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", "views");

// Use the router
app.use("/", expenseRoutes);

// Server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
