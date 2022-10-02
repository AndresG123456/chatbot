const stepsInitial = require("../flow/initial.json");
const stepsReponse = require("../flow/response.json");

// Obtener mensaje
const get = (message) =>
  new Promise((resolve, reject) => {
    const { key } = stepsInitial.find((k) => k.keywords.includes(message)) || {
      key: null,
    };
    const response = key || null;
    resolve(response);
  });

// Obtener respuesta
const reply = (step) =>
  new Promise((resolve, reject) => {
    let resData = { replyMessage: "", media: null};
    const responseFind = stepsReponse[step] || {};
    resData = {
      ...resData,
      ...responseFind,
      replyMessage: responseFind.replyMessage.join(""),
    };
    resolve(resData);
    return;
  });

module.exports = { get, reply };
