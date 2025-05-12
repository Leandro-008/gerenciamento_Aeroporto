const Voo = require('../models/vooModel');
const Portao = require('../models/portaoModel');

exports.create = async (req, res) => {
  try {
    const { portaoId } = req.body;

    const portao = await Portao.findById(portaoId);
    if (!portao) return res.status(404).json({ error: 'Portão não encontrado' });
    if (!portao.disponivel) return res.status(400).json({ error: 'Portão já está ocupado' });

    const voo = await Voo.create(req.body);

    const portaoAtualizado = await Portao.findByIdAndUpdate(
      portaoId,
      { disponivel: true },
      { new: false }
    );

    console.log('Portão após atualização:', portaoAtualizado);

    res.status(201).json(voo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const voos = await Voo.find();
    res.json(voos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar voos' });
  }
};

exports.getById = async (req, res) => {
  try {
    const voo = await Voo.findById(req.params.id);
    if (!voo) return res.status(404).json({ error: 'Voo não encontrado' });
    res.json(voo);
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' });
  }
};

exports.update = async (req, res) => {
  try {
    const vooAntigo = await Voo.findById(req.params.id);
    if (!vooAntigo) return res.status(404).json({ error: 'Voo não encontrado' });

    const vooAtualizado = await Voo.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (
      req.body.status === 'concluido' &&
      vooAntigo.status !== 'concluido' &&
      vooAtualizado.portaoId
    ) {
      const portaoLiberado = await Portao.findByIdAndUpdate(
        vooAtualizado.portaoId,
        { disponivel: true },
        { new: true }
      );
      console.log('Portão liberado:', portaoLiberado);
    }

    res.json(vooAtualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const voo = await Voo.findByIdAndDelete(req.params.id);
    if (!voo) return res.status(404).json({ error: 'Voo não encontrado' });

    if (voo.portaoId) {
      await Portao.findByIdAndUpdate(voo.portaoId, { disponivel: true });
    }

    res.json({ message: 'Voo removido' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao remover voo' });
  }
};
