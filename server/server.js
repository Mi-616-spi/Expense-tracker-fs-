const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

const MONGO_URI = "mongodb://localhost:27017/expensetracker";

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); 
});

const transactionRoutes = require("./routes/transactions");

app.use("/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Expense Tracker API is running!" });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); 
  });
