const mongoose = require('mongoose');

const VooSchema = new mongoose.Schema({
  numeroVoo: { type: String, required: true },
  origem: { type: String, required: true },
  destino: { type: String, required: true },
  dataHoraPartida: { type: Date, required: true },
  portaoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portao' },
  status: { type: String, enum: ['programado', 'embarque', 'concluido'], default: 'programado' },
});

module.exports = mongoose.model('Voo', VooSchema);