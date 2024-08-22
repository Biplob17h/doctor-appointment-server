import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name is too short"],
    maxLength: [50, "Name is too long"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password is too short"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "",
  },
  age: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["new", "old"],
    default: "new",
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
});

const User = mongoose.model("Users", usersSchema);

export default User;
