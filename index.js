const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


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

app.get('/accessories', (req, res) => {
    const sql = "SELECT * FROM `accessories`";
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

app.post('/add', (req, res) => {
    const sql = "INSERT INTO `accessories`(`id`, `name`, `type`, `price`, `picture`, `description`) VALUES (?)";
    const values = [req.body.id, req.body.itemName, req.body.itemType, req.body.price, req.body.itemPicture, req.body.itemDescription];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating data in database");
        } else {
            res.send(data);
        }
    });
});

app.get('/:table/:id', (req, res) => {
    const table = req.params.table;
    const id = req.params.id;
    const sql = `SELECT * FROM \`${table}\` WHERE id=?`;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching data from database");
        } else {
            res.send(data);
        }
    });
});


app.delete('/delete/:id/:table', (req, res) => {
    const table = req.params.table;
    const id = req.params.id;
    let sql;
    if (table === 'accessories') {
        sql = 'DELETE FROM `accessories` WHERE id=?';
    } else {
        return res.status(400).send("Invalid table name");
    }

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting data from database");
        } else {
            res.send(data);
        }
    });
});

app.put("/update/:table/:id", (req, res) => {
    const table = req.params.table;
    const id = req.params.id;
    const sql = `UPDATE \`${table}\` SET \`name\` = ?, \`type\` = ?, \`price\` = ?, \`picture\` = ?, \`description\` = ? WHERE id = ?`;
    const values = [req.body.itemName, req.body.itemType, req.body.price, req.body.itemPicture, req.body.itemDescription, id];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error updating data in database");
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