const express = require("express");

const {users}  = require("./data/users.json");

const app = express();

const PORT = 8081;

app.get("/", (re, res)=>{
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