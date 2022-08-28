const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Routes
app.use(require('./routes/consejos'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/medicamentos'));
app.use(require('./routes/eventos'));
app.use(require('./routes/um'));
app.use(require('./routes/ue'));
app.use(require('./routes/ejercicios'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
  });