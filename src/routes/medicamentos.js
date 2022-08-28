const express = require('express');
const router = express.Router();

const mysqlConnection = require ('./database.js');

router.get('/medicamentos/', (req, res) => {
    mysqlConnection.query('SELECT * FROM medicamentos', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

  router.get('/medicamentos/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM medicamentos WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // DELETE A MEDICAMENTO
  router.delete('/medicamentos/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM medicamentos WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Medicamento Deleted'});
      } else {
        console.log(err);
      }
    });
  });
  
  // INSERT A MEDICAMENTO
  router.post('/medicamentos/', (req, res) => {
    const {id, nombre, composicion} = req.body;
    console.log(id, nombre, composicion);
    const query = `
      CALL medicamentosAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, nombre, composicion], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Medicamento Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/medicamentos/:id', (req, res) => {
    const { title, description, image } = req.body;
    const { id } = req.params;
    const query = `
      CALL medicamentosAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, nombre, composicion], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'User Updated'});
      } else {
        console.log(err);
      }
    });
  });
module.exports = router;