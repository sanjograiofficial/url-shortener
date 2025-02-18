const mongoose = require("mongoose");

async function connectmongo(url) {
  mongoose.connect(url);
}

module.exports = {
  connectmongo,
};
