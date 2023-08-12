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

const deepCopy = (obj) => {
    if (obj === null || typeof obj !== 'object') {
    return obj;
    }

    if (obj instanceof Date) {
    return new Date(obj);
    }

    if (Array.isArray(obj)) {
    const arrCopy = [];
    for (let i = 0; i < obj.length; i++) {
        arrCopy[i] = deepCopy(obj[i]);
    }
    return arrCopy;
    }

    const objCopy = {};
    for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        objCopy[key] = deepCopy(obj[key]);
    }
    }
    return objCopy;
}

const currentPuzzlesData = {};

io.on("connection", socket => {
    console.log('A new user connected with socket id: ' + socket.id);
    socket.on("update-dials", (puzzle, lighting, roomId) => {
        // console.log(puzzle);
        if(currentPuzzlesData[roomId]){
            currentPuzzlesData[roomId]["puzzle"] = deepCopy(puzzle);
            currentPuzzlesData[roomId].lighting = {...lighting};
        }
        else{
            currentPuzzlesData[roomId] = {"puzzle": deepCopy(puzzle), "lighting": {...lighting}};
            // console.log(currentPuzzlesData[roomId]);
        }
        console.log("Copy: ", currentPuzzlesData[roomId].puzzle);
        io.to(roomId).emit('execute-update', puzzle, lighting);
    })

    socket.on("load-dials", (roomId) => {
        if (currentPuzzlesData[roomId]) {
            console.log("data:", currentPuzzlesData[roomId].puzzle);
            io.to(roomId).emit('execute-update', currentPuzzlesData[roomId].puzzle, currentPuzzlesData[roomId].lighting);
            // socket.emit('update-dials', currentPuzzlesData[roomId].puzzle, currentPuzzlesData[roomId].lighting, roomId);
        }
        else{console.log("false")}
    })

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
    })
})
