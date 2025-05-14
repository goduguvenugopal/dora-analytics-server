const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const corsOptions = require("./cors");
const router = require("./routes.js/visitors");

// app.use(cors())
app.use(cors(corsOptions));
app.use(express.json());

app.use("/analytics/api", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Analytics server running on port ${PORT}`);
});
