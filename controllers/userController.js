const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register a User
//@route GET /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { user, email, password } = req.body;

  if (!user || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory ");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, "hashed password");

  const createdUser = await User.create({
    user,
    email,
    password: hashedPassword,
  });

  console.log(`user created ${createdUser}`);

  if (createdUser) {
    res.status(201).json({ _id: createdUser.id, email: createdUser.email });
  } else {
    res.status(400);
    throw new Error("user data is not valid ");
  }
});

//@desc Login  User
//@route GET /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const createdUser = await User.findOne({ email });

  if (createdUser && (await bcrypt.compare(password, createdUser.password))) {
    const acessToken = jwt.sign(
      {
        createdUser: {
          user: createdUser.user,
          email: createdUser.email,
          id: createdUser.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ acessToken });
  } else {
    res.status(400);
    throw new Error("email or password is not valid ");
  }
});

//@desc  Get current user
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
