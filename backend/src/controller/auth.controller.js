const User = require("../models/user.models");
const bcrypt = require("bcrypt");

// SIGNUP
exports.signup = async (req, res) => {
  try {
const { firstName, lastName, email, age, password } = req.body;
    // validation
   if (!firstName || !lastName || !email || !password) {
  return res.status(400).json({ message: "All fields required" });
}

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
   const user = new User({
  firstName,
  lastName,
  email,
  age,
  password: hashedPassword,
});

    await user.save();

    res.status(201).json({ message: "Signup successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};