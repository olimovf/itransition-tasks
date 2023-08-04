const crypto = require("crypto");

class CryptoUtil {
  static generateRandomKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  static calculateHMAC(message, key) {
    return crypto.createHmac("sha3-256", key).update(message).digest("hex");
  }
}

module.exports = CryptoUtil;
