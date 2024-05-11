const mongoose = require("mongoose");

const ipoLinkSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  exists:{
    type:Boolean
  }
});

const IpoLink = mongoose.model("IpoLink", ipoLinkSchema);
module.exports = IpoLink;