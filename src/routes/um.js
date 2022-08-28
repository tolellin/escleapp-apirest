const express = require('express');
const router = express.Router();

const mysqlConnection = require ('./database.js');

router.get('/um/', (req, res) => {
    mysqlConnection.query('SELECT * FROM users_medicamentos', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

  router.get('/um/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM users_medicamentos WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // DELETE A MEDICAMENTO
  router.delete('/um/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM users_medicamentos WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'User_Medicamento Deleted'});
      } else {
        console.log(err);
      }
    });
  });
  
  // INSERT A MEDICAMENTO
  router.post('/um/', (req, res) => {
    const {id, id_user, id_medicamento} = req.body;
    console.log(id, id_user, id_medicamento);
    const query = `
      CALL users_medicamentosAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, id_user, id_medicamento], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'User_Medicamento Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/um/:id', (req, res) => {
    const { id_user, id_medicamento } = req.body;
    const { id } = req.params;
    const query = `
      CALL users_medicamentosAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, id_user, id_medicamento], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'User_Medicamento Updated'});
      } else {
        console.log(err);
      }
    });
  });
module.exports = router;