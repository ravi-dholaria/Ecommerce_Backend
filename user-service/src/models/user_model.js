//#region Import statements
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
//#endregion

//#region user Schema
const user_schema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    address: {
      type: String,
      require: true,
    },
    profile_path: {
      type: String,
      require: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    phone_number: {
      type: String,
      require: true,
      minlength: 10,
      maxlength: 10,
      unique: true,
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
  },
  { timestamps: true }
);
//#endregion

//#region hash password before saving
user_schema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//#endregion

export default mongoose.model("User", user_schema);
