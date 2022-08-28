const express = require('express');
const router = express.Router();

const mysqlConnection = require ('./database.js');

router.get('/consejos/', (req, res) => {
    mysqlConnection.query('SELECT * FROM help', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

  router.get('/consejos/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM help WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // DELETE A HELP
  router.delete('/consejos/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM help WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Help Deleted'});
      } else {
        console.log(err);
      }
    });
  });
  
  // INSERT A HELP
  router.post('/consejos/', (req, res) => {
    const {id, title, description, image} = req.body;
    console.log(id, title, description, image);
    const query = `
      CALL helpAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, title, description, image], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Help Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/consejos/:id', (req, res) => {
    const { title, description, image } = req.body;
    const { id } = req.params;
    const query = `
      CALL helpAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, title, description, image], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Help Updated'});
      } else {
        console.log(err);
      }
    });
  });
module.exports = router;