const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

require("dotenv").config();

const connectDB = require("./config/db");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

//DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use(morgan('tiny'));

// Routes
app.use(authRoutes);
app.use(postRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
