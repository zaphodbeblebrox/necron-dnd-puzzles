const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

require("./config/mongoose-config");

app.use(express.json(), express.urlencoded({extended:true}));

require("./routes/puzzleRoutes")(app);

const port = 8000;
app.listen(port, () => console.log(`Necron Server is running on port ${port}!`));