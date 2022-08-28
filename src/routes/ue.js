const express = require('express');
const router = express.Router();

const mysqlConnection = require ('./database.js');

router.get('/ue/', (req, res) => {
    mysqlConnection.query('SELECT * FROM users_events', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

  router.get('/ue/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM users_events WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // DELETE A MEDICAMENTO
  router.delete('/ue/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM users_events WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'User_Event Deleted'});
      } else {
        console.log(err);
      }
    });
  });
  
  // INSERT A MEDICAMENTO
  router.post('/ue/', (req, res) => {
    const {id, id_user, id_event} = req.body;
    console.log(id, id_user, id_event);
    const query = `
      CALL users_eventAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, id_user, id_event], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'User_Event Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/ue/:id', (req, res) => {
    const { title, id_user, id_event } = req.body;
    const { id } = req.params;
    const query = `
      CALL users_eventAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id,  id_user, id_event], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'User_Event Updated'});
      } else {
        console.log(err);
      }
    });
  });
module.exports = router;