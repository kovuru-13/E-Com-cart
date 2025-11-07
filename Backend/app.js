const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ Use your MongoDB Atlas connection from .env
const dbUrl = process.env.MONGO_URI;

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Import routes
const routes = require("./routes/index");
app.use("/api", routes);

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
