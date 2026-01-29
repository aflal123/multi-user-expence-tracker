const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addExpense, getExpensesByDate } = require("../controllers/expenseController");

router.post("/", auth, addExpense);
router.get("/", auth, getExpensesByDate);

module.exports = router;


//multer 
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });
