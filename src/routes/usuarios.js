const express = require('express');
const router = express.Router();

const mysqlConnection = require ('./database.js');

router.get('/usuarios/', (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

  router.get('/usuarios/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // DELETE A HELP
  router.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM users WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'User Deleted'});
      } else {
        console.log(err);
      }
    });
  });
  
  // INSERT A USER
  router.post('/usuarios/', (req, res) => {
    const {id, nombre, apellido, imagen, edad, sexo, email} = req.body;
    console.log(id, nombre, apellido, imagen, edad, sexo, email);
    const query = `
      CALL usersAddOrEdit(?, ?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, nombre, apellido, imagen, edad, sexo, email], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'User Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/usuarios/:id', (req, res) => {
    const { nombre, apellido, imagen, edad, sexo, email } = req.body;
    const { id } = req.params;
    const query = `
    CALL usersAddOrEdit(?, ?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, nombre, apellido, imagen, edad, sexo, email], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'User Updated'});
      } else {
        console.log(err);
      }
    });
  });
module.exports = router;