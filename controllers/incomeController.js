const db = require("../config/firebase");

//C - Create income POST
exports.createIncome = async (req, res) => {
  try {
    const newIncomeRef = db.ref("incomes").push();
    await newIncomeRef.set(req.body);

    res
      .status(201)
      .json({ id: newIncomeRef.key, message: "Income created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//R - Retrive all incomes GET
exports.getAllIncomes = async (req, res) => {
  try {
    const snapshot = await db.ref("incomes").once("value");
    const data = snapshot.val();
    const incomes = data
      ? Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
      : [];
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//U - Update income using ID PUT
exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const incomeRef = db.ref("incomes").child(id);
    await incomeRef.update(updatedData);
    res.status(200).json({
      message: `Income updated successfully`,
      updatedFields: updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//D - Delete income using ID DELETE
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    await db.ref("incomes").child(id).remove();
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
