const { get, reply } = require("../chat");

// Encontrar paso
const getMessages = async (message) => {
  const data = await get(message);
  return data;
};

// Buscar respuesta
const responseMessages = async (step) => {
  const data = await reply(step);
  return data;
};

module.exports = { getMessages, responseMessages };
