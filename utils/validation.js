exports.validateCPF = (cpf) => {
  return /^\d{11}$/.test(cpf);
};