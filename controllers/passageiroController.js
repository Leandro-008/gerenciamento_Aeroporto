const Passageiro = require('../models/passageiroModel');
const Voo = require('../models/vooModel');
const { validateCPF } = require('../utils/validation');

const create = async (req, res) => {
  const { nome, cpf, vooId } = req.body;
  if (!validateCPF(cpf)) return res.status(400).json({ error: 'CPF inválido' });

  const voo = await Voo.findById(vooId);
  if (!voo) return res.status(404).json({ error: 'Voo não encontrado' });
  if (voo.status !== 'embarque') return res.status(400).json({ error: 'Check-in permitido apenas durante o embarque' });

  try {
    const passageiro = await Passageiro.create({ nome, cpf, vooId });
    res.status(201).json(passageiro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const passageiros = await Passageiro.find();
    res.status(200).json(passageiros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const passageiro = await Passageiro.findById(req.params.id);
    if (!passageiro) return res.status(404).json({ error: 'Passageiro não encontrado' });
    res.status(200).json(passageiro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const passageiro = await Passageiro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!passageiro) return res.status(404).json({ error: 'Passageiro não encontrado' });
    res.status(200).json(passageiro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const passageiro = await Passageiro.findByIdAndDelete(req.params.id);
    if (!passageiro) return res.status(404).json({ error: 'Passageiro não encontrado' });
    res.status(200).json({ message: 'Passageiro removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create, getAll, getById, update, remove };
