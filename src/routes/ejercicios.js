const express = require('express');
const router = express.Router();

const mysqlConnection = require ('./database.js');

router.get('/ejercicios/', (req, res) => {
    mysqlConnection.query('SELECT * FROM ejercicios', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

  router.get('/ejercicios/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM ejercicios WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // DELETE A HELP
  router.delete('/ejercicios/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM ejercicios WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Ejercicio Deleted'});
      } else {
        console.log(err);
      }
    });
  });
  
  // INSERT A HELP
  router.post('/ejercicios/', (req, res) => {
    const {id, nombre, descripcion, imagen, nivel} = req.body;
    console.log(id, nombre, descripcion, imagen, nivel);
    const query = `
      CALL ejerciciosAddOrEdit(?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, nombre, descripcion, imagen, nivel], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Ejercicio Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/ejercicios/:id', (req, res) => {
    const { nombre, descripcion, imagen, nivel } = req.body;
    const { id } = req.params;
    const query = `
      CALL ejerciciosAddOrEdit(?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, nombre, descripcion, imagen, nivel], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Ejercicio Updated'});
      } else {
        console.log(err);
      }
    });
  });
module.exports = router;