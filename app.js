const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
// const upload = require("express-fileupload");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(upload());

// MONGODB SETUP
mongoose
  .connect(process.env.CONNECT_STRING, { useNewUrlParser: true })
  .then(res => console.log("mongoose is connnected and working"))
  .catch(err => console.log(err));

require("./routes/api/DiagnosisRoute")(app);
require("./routes/api/PatientRoute")(app);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
