import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import generateToken from "../utils/token.js";
const createAUser = async (req, res) => {
  try {
    const { name, email, password, gender, age, photo, phone } = req.body;

    // check if the user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "User with the same email already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      age,
      photo,
      phone,
    });
    const result = await user.save();
    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};

const userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // GET  CREDENTIALS
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide your credentials",
      });
    }

    // FIND USER
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "No user found",
      });
    }

    // CHECK PASSWORD
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: "fail",
        message: "wrong password",
      });
    }

    // GENERATE TOKEN
    const token = generateToken(user);

    // USER DATA
    const userData = await User.findOne({ email: email }).select("-password");

    res.status(200).json({
      status: "success",
      message: "User sign in successfully",
      data: {
        userData,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// SEND USER DATA TO CLIENT SIDE
const getUser = async (req, res) => {
  try {
    // GET USER DATA
    const user = req.user;
    const email = user.email;

    // FIND USER
    const userData = await User.findOne({ email: email }).select("-password");

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      userData,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export { createAUser, userLogIn, getUser };
