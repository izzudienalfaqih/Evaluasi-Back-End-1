const { Schema, Types, model } = require("mongoose");

const penggunaSchema = Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: [3, "username min 3 character"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    phone: {
      type: Number,
      maxlength: [12, "phone max 12 character"],
      default: "",
    },
    avatar: {
      type: String,
      default: "https://i.ibb.co.com/sWLtm0h/Tanpa-Judul.jpg",
    },
  },
  { timestamps: true }
);

module.exports = model("Pengguna", penggunaSchema);
