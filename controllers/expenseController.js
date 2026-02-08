const db = require("../config/firebase");

//C - Create an expense
exports.createExpense = async (req, res) => {
  try {
    const newExpenseRef = db.ref("expenses").push();
    await newExpenseRef.set(req.body);

    res
      .status(201)
      .json({ id: newExpenseRef.key, message: "Expense created succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//R - Read all expenses GET
exports.getAllExpenses = async (req, res) => {
  try {
    const snapshot = await db.ref("expenses").once("value");
    const data = snapshot.val();
    const expenses = data
      ? Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
      : [];
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//U - Update using ID PUT
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const expenseRef = db.ref("expenses").child(id);
    await expenseRef.update(updatedData);
    res.status(200).json({
      message: `Expense updated succesfully`,
      updatedFields: updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//D Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await db.ref("expenses").child(id).remove();
    res.status(200).json({ message: `Expense deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
