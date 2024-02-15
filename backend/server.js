const express = require("express");
const dotenv = require("dotenv").config();  // necessary to use environment variable i.e. PORT
const port = process.env.PORT || 5000;
const colors = require("colors")
const {errorHandler} = require("./middleware/errorMiddleware");
const {connectDB} = require("./config/db")

connectDB()
const app = express();

app.use(errorHandler);
// Require for passing/getting json format text
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
