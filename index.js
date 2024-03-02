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

app.get('/service', (req, res) => {
    const sql = "SELECT * FROM `services`";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching data from database");
        } else {
            res.send(data);
        }
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO `services`(`name`, `charge`, `picture`, `description`) VALUES (?)";
    const values = [req.body.serviceName, req.body.charge, req.body.servicePicture, req.body.serviceDescription];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating data in database");
        } else {
            res.send(data);
        }
    });
});

app.get('/', (req, res) => {
    res.send('Project is running properly')
})

app.listen(port, () => {
    console.log(`Project is running properly on port ${port}`);
})