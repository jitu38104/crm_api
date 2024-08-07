require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// install socket.io first
// const http = require("http");
// const socketIO = require("socket.io");
const path = require("path");
const PORT = process.env.PORT || process.env.SERVER_PORT;

app.use(cors());

// const server = http.createServer(app);
// const io = socketIO(server);

// const socketEvents = require("./socket/chatEvents");
// socketEvents(io); //start socket services


const {userRoute, leadRoute, siteRoute, generalRoute, cypherWebRoute, cypherPortalRoute} = require("./routes/index");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.locals.publicPath = path.join(__dirname, "public");

app.use("/public", express.static("public"));
app.use(express.static(__dirname+"/public"));


app.get("/", (req, res) => res.send("<h2>Welcome to Cypher CRM v2.3</h2>"));

app.use("/api", generalRoute);
app.use("/api/user", userRoute);
app.use("/api/lead", leadRoute);

//**************website API**************//
app.use("/api/site", siteRoute);
app.use("/api/cypher", cypherWebRoute);
app.use("/api/portal", cypherPortalRoute);
//***************************************//

app.get("**", (req, res) => res.send("<h1>404 Not Found!</h1>"));

app.use((err, req, res, next) => {
    console.log("err",err.msg);
    res.status(err.status||500).json({error: true, msg: err.msg});
});

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
    console.log("click here: http://localhost:"+PORT);
});

