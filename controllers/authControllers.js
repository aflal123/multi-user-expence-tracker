const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//sighnup
const SECRET = process.env.JWT_SECRET;
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) return res.status(400).json(err);
    res.json({ message: "User registered successfully" });
  });
};

//login 
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (result.length === 0)
        return res.status(401).json({ message: "User not found" });

      const user = result[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match)
        return res.status(401).json({ message: "Wrong password" });

      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1d" });

      res.json({ token, user });
    }
  );
};

