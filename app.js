const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passageiroRoutes = require('./routes/passageiroRoutes');
const vooRoutes = require('./routes/vooRoutes');
const portaoRoutes = require('./routes/portaoRoutes');

app.use(bodyParser.json());

app.use('/passageiros', passageiroRoutes);
app.use('/voos', vooRoutes);
app.use('/portoes', portaoRoutes);

mongoose.connect('mongodb://localhost:27017/aeroporto')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro de conexão:', err));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
