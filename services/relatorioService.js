const relatorioService = require('./services/relatorioService');
app.get('/relatorio/dia', relatorioService.gerarRelatorio);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});


const Voo = require('../models/vooModel');
const Passageiro = require('../models/passageiroModel');
const Portao = require('../models/portaoModel');

exports.gerarRelatorio = async (req, res) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);

    const voos = await Voo.find({
      dataHoraPartida: { $gte: hoje, $lt: amanha },
    }).populate('portaoId');

    const relatorio = await Promise.all(voos.map(async (voo) => {
      const passageiros = await Passageiro.find({ vooId: voo._id });
      return {
        voo: voo.numeroVoo,
        origem: voo.origem,
        destino: voo.destino,
        dataHoraPartida: voo.dataHoraPartida,
        status: voo.status,
        portao: voo.portaoId?.codigo || null,
        passageiros: passageiros.map(p => ({ nome: p.nome, cpf: p.cpf, statusCheckIn: p.statusCheckIn }))
      };
    }));

    res.json(relatorio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
