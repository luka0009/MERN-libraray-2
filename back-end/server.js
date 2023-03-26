require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bookRoute = require('./routes/bookRoute');
const authRoute = require('./routes/authRoute');
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use('/api', bookRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(
    '<h1 style="color: green; margin: 250px 500px; font-size: 44px;"> Home Page </h1>'
  );
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running - PORT:", PORT);
    });
  })
  .catch((err) => console.log(err));


