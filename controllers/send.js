const DELAY_TIME = 170; //ms

// Enviar mensajes
const sendMessage = async (client, number = null, text = null) => {
  setTimeout(async () => {
    const message = text;
    client.sendMessage(number, message);
    console.log(`Mensaje enviado....`);
  }, DELAY_TIME);
};

module.exports = { sendMessage };
