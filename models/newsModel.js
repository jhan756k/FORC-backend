const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String
    },
    img: {
      type: String,
      default: "/images/newdoc.png"
    }
  },
  { timestamps: true}
);

module.exports = mongoose.model("News", newsSchema);