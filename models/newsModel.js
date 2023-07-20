const mongoose = require("mongoose");
const moment = require("moment");

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: moment().format("YYYY-MM-DD HH:mm:ss"),
    }
  },
  { timestamps: false}
);

module.exports = mongoose.model("News", newsSchema);