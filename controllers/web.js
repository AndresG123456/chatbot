const fs = require("fs");

// Obtener QR
const getQr = (req, res) => {
  res.writeHead(200, { "content-type": "image/svg+xml" });
  fs.createReadStream(`${__dirname}/../qr/qr-code.svg`).pipe(res);
};

module.exports = { getQr };
