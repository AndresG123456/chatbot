require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Controllers
const { generateImage, isValidNumber } = require("./controllers/handle");
const { connectionReady } = require("./controllers/connection");
const { getMessages, responseMessages } = require("./controllers/flows");
const { sendMessage } = require("./controllers/send");

// Servidor
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const server = require("http").Server(app);

// Puerto
const port = process.env.PORT || 3000;

// Cliente
let client;

// Rutas
app.use("/", require("./routes/web"));

// Escuchar mensajes
const listenMessage = () =>
  client.on("message", async (msg) => {
    const { from, body, hasMedia } = msg;

    // Validar número
    if (!isValidNumber(from)) {
      return;
    }

    message = body.toLowerCase();
    console.log("Mensaje recibido:", message);

    // Respuesta apartir de flujo
    const step = await getMessages(message);

    if (step) {
      const response = await responseMessages(step);

      await sendMessage(client, from, response.replyMessage);

      return;
    } else {
      const response = await responseMessages("STEP_0");

      await sendMessage(client, from, response.replyMessage);
    }
  });

client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

client.on("qr", (qr) =>
  generateImage(qr, () => {
    qrcode.generate(qr, { small: true });

    console.log(`Ver QR http://localhost:${port}/qr`);
    socketEvents.sendQR(qr);
  })
);

client.on("ready", (a) => {
  connectionReady();
  listenMessage();
});

client.on("auth_failure", (e) => {});

client.on("authenticated", () => {
  console.log("Authenticated");
});

client.initialize();

// Servidor
server.listen(port, () => {
  console.log(`El server esta listo por el puerto ${port}`);
});
