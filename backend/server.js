const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/Auth");

const taskRoutes = require("./routes/Task");
const app = express();
const mongoUrl = process.env.MONGO_URI || process.env.MONGO_URL;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/Tasks", taskRoutes);
app.use("/", taskRoutes);

if (!mongoUrl) {
  console.error(
    "DB connection error: MONGO_URI or MONGO_URL is missing in .env",
  );
  process.exit(1);
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);

    if (err.name === "MongooseServerSelectionError") {
      console.error(
        "Atlas could not be reached. Check MongoDB Atlas Network Access, database user credentials, and whether the cluster is running.",
      );
    }
  });
