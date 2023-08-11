const express = require("express");
const cors = require("cors");
const app = express();
const socket = require("socket.io");
app.use(cors());

require("./config/mongoose-config");

app.use(express.json(), express.urlencoded({extended:true}));

require("./routes/puzzleRoutes")(app);

const port = 8000;
const server = app.listen(port, () => console.log(`Necron Server is running on port ${port}!`));

const io = socket(server, {cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    allowedHeaders: ['*'],
    credentials: true
}});

io.on("connection", socket => {
    console.log('A new user connected with socket id: ' + socket.id);
    socket.on("update-dials", (puzzle, lighting) => {
        // console.log(puzzle);
        // console.log(lighting);
        io.emit('execute-update', puzzle, lighting);
    })
    // io.emit("Welcome", "Nice to meet you!");
    // socket.on("Welcome", data => {
    //     console.log(data);
    // })
    // socket.on("goodbye", data => {
    //     console.log(data);
    //     io.emit("Welcome", data);
    // })

})
