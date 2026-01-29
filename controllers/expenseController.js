const db = require("../config/db");

exports.addExpense = (req, res) => {
  const { reason, amount, date, image } = req.body;

  const sql = `
    INSERT INTO expenses (user_id, reason, amount, expense_date, receipt_image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [req.userId, reason, amount, date, image || null],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Expense added" });
    }
  );
};
//date picker 
exports.getExpensesByDate = (req, res) => {
  const { date } = req.query;

  const sql = `
    SELECT * FROM expenses
    WHERE user_id = ? AND expense_date = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [req.userId, date], (err, result) => {
    if (err) return res.status(400).json(err);
    res.json(result);
  });
};
