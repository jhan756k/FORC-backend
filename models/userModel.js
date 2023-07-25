const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,   
      unique: [true, "Name already exists"],
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      maxlength: [50, "Email can not be more than 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      trim: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      default: "Visitor",
    },
    team: {
      type: String,
      default: "",
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);