const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware Here
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fixnest"
})

app.get('/', (req, res) => {
    res.send('Project is running properly')
})

app.listen(port, () => {
    console.log(`Project is running properly on port ${port}`);
})