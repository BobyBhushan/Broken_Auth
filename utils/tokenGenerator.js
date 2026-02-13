const crypto = require("crypto");
const { getSecretFromDB } = require("./mockDb");

const generateToken = async (email) => {
  try {
    const secret = await getSecretFromDB();

    return crypto
      .createHmac("sha256", secret)
      .update(email)
      .digest("base64");
  } catch (error) {
    // THE BUG: Empty catch block.
    // Error is swallowed and undefined is returned.
    console.log('LINE 15 ====>   Error ' + error);
  }
};

module.exports = { generateToken };
