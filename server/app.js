const express = require("express");
const app = express();
const cors = require("cors");

const appRoutes = require("./routes");

// allow cross origin requests
app.use(cors());
app.use(express.json());
app.use("/app", appRoutes);

app.listen(3002, () => {
  console.log("Server has started on port 3002");
});
