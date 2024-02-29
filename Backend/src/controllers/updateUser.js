const { User } = require("../db");

const updateUser = async (req, res) =>  {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
    
        user.name = req.body.name;
        user.email = req.body.email;
        user.tel = req.body.tel;
    
        await user.save();
        res.json(user);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  }

  module.exports = { updateUser}    