const Portao = require('../models/portaoModel');
const Voo = require('../models/vooModel');

exports.create = async (req, res) => {
  try {
    const portao = await Portao.create(req.body);
    res.status(201).json(portao);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  const portoes = await Portao.find();
  res.json(portoes);
};

exports.getById = async (req, res) => {
  const portao = await Portao.findById(req.params.id);
  if (!portao) return res.status(404).json({ error: 'Portão não encontrado' });
  res.json(portao);
};

exports.update = async (req, res) => {
  try {
    const portao = await Portao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!portao) return res.status(404).json({ error: 'Portão não encontrado' });
    res.json(portao);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const portao = await Portao.findByIdAndDelete(req.params.id);
  if (!portao) return res.status(404).json({ error: 'Portão não encontrado' });
  res.json({ message: 'Portão removido' });
};
