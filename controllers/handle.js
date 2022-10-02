const qr = require("qr-image");

// Generar QR
const generateImage = (base64, cb = () => {}) => {
  let qr_svg = qr.image(base64, { type: "svg", margin: 4 });
  qr_svg.pipe(require("fs").createWriteStream("./qr/qr-code.svg"));
  console.log(`El QR se actualiza cada minuto'`);
  cb();
};

// Validar que sea un número válido
const isValidNumber = (rawNumber) => {
  const regexGroup = /\@g.us\b/gm;
  const exist = rawNumber.match(regexGroup);
  return !exist;
};

module.exports = { generateImage, isValidNumber };
