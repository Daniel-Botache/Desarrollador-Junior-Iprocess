const { User } = require("../db");

const createUser = async (req, res) =>  {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
      });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  module.exports = { createUser}