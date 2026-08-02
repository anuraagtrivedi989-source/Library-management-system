const express = require("express");

const app = express();

const PORT = 8081;

app.get("/", (re, res)=>{
    res.status(200).json({
        message: "Home Page!!-:)"
    })
})

// app.all(' * ', (req, res)=>{
//     res.status(500).json({
//         message: "not built yet"
//     })
// })
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})