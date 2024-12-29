const User = require('../models/User');

const userController = {
  createUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ errors: err.errors });
      }
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      if (err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid User ID' });
      }
      res.status(500).json({ message: 'Server Error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ errors: err.errors });
      }
      console.error(err);
      if (err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid User ID' });
      }
      res.status(500).json({ message: 'Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    } catch (err) {
      console.error(err);
      if (err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid User ID' });
      }
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

module.exports = userController;