const db = require("../config/firebase");

//C - create user POST
exports.createUser = async (req, res) => {
  try {
    const newUserRef = db.ref("users").push();
    await newUserRef.set(req.body);
    res
      .status(201)
      .json({ id: newUserRef.key, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//R - Retrive all users GET
exports.getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.ref("users").once("value");
    const data = snapshot.val();
    const users = data
      ? Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
      : [];
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//U - Update using ID PUT
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const userRef = db.ref("users").child(id);

    const snapshot = await db.ref("users").child(id).once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "User not found. Invalid ID.",
      });
    }

    await userRef.update(updatedData);
    res.status(200).json({
      success: true,
      message: `User updated successfully`,
      updatedFields: updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//D - Delete user using id DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.ref("users").child(id).once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "User not found. Invalid ID.",
      });
    }

    await db.ref("users").child(id).remove();
    res
      .status(200)
      .json({ success: true, message: `User deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
