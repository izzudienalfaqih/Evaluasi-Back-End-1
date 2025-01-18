const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    username: {
      type: String,
      minlength: [3, "username min 3 character"],
      //ngga boleh ada yg sama
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: [8, "password min 8 character"],
      required: true,
    },
    avatar: {
      path: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
