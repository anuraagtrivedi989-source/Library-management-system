const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const express = require("express");

const {users}  = require("./data/users.json");

const dotenv = require("dotenv");
dotenv.config();
const DbConnection = require("./databaseconnection");
DbConnection();

const app = express();


const PORT = 8081;

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Home Page!!-:)"
    })
})

app.get("/users", (req, res)=>{
    res.status(200).json({
        success:true,
        data : users
    })
})
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})