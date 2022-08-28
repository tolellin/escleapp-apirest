const express = require('express');
const router = express.Router();

const mysqlConnection = require ('./database.js');

router.get('/eventos/', (req, res) => {
    mysqlConnection.query('SELECT * FROM event', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

  router.get('/eventos/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM event WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // DELETE A MEDICAMENTO
  router.delete('/eventos/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM event WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Evento Deleted'});
      } else {
        console.log(err);
      }
    });
  });
  
  // INSERT A MEDICAMENTO
  router.post('/eventos/', (req, res) => {
    const {id, title, start, description} = req.body;
    console.log(id, title, start, description);
    const query = `
      CALL eventAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, title, start, description], (err, rows, fields) => {
      if(!err) {
        res.json([rows[0]]);
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/eventos/:id', (req, res) => {
    const {title, start, description } = req.body;
    const { id } = req.params;
    const query = `
      CALL eventAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, title, start, description], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Evento Updated'});
      } else {
        console.log(err);
      }
    });
  });
module.exports = router;