const mongoose = require('mongoose');

const PassageiroSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  vooId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voo', required: true },
  statusCheckIn: { type: String, enum: ['pendente', 'realizado'], default: 'pendente' },
});

module.exports = mongoose.model('Passageiro', PassageiroSchema);