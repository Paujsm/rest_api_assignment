require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");

app.use(express.json());

app.use("/users", userRoutes);

app.use("/expenses", expenseRoutes);

app.use("/incomes", incomeRoutes);

app.get("/", (req, res) => {
  res.send(
    "Welcome to a New Rest API. Available in points: /users, /expenses, /income",
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

module.exports = app;
