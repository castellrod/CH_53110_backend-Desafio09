const crypto = require('crypto');


const SECRET = "Com_53110";
const creaHash = password => crypto.createHmac("sha256", SECRET).update(password).digest("hex");

module.exports.creaHash = creaHash;