const db = require("../config/firebase");

//C - Create an expense POST
exports.createExpense = async (req, res) => {
  try {
    const newExpenseRef = db.ref("expenses").push();
    await newExpenseRef.set(req.body);

    res
      .status(201)
      .json({ id: newExpenseRef.key, message: "Expense created successfully" });
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

    const snapshot = await db.ref("expenses").child(id).once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "Not found. Invalid ID.",
      });
    }

    await expenseRef.update(updatedData);
    res.status(200).json({
      success: true,
      message: `Expense updated successfully`,
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

    const snapshot = await db.ref("expenses").child(id).once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "Not found. Invalid ID.",
      });
    }

    await db.ref("expenses").child(id).remove();
    res
      .status(200)
      .json({ success: true, message: `Expense deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
