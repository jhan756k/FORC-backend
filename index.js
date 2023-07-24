const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
