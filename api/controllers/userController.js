const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        username: req.body.username,
        password: hashed,
      });

      const user = await newUser.save();

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("User không tồn tại!!!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(500).json("Password sai!!!");
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          admin: user.admin,
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: "30m" }
      );
      const { password, ...info } = user._doc;
      return res.status(200).json({ info, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
