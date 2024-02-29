const { User } = require("../db");

const deleteUser = async (req, res) =>  {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
          res.status(404).json({ message: 'user not found' });
          return;
        }
    
        await user.destroy();
        res.json({ message: 'user deleted' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  }

  module.exports = { deleteUser}