const { User, Thought } = require('../models');

module.exports = {
    // Get all Users 
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  },
    // Get a single user 
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
   // Update a user
   async updateUser(req, res) {
    try {
      const course = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
    // Delete a user 
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
  
        if (!user) {
          res.status(404).json({ message: 'No user with that ID' });
        }
  
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and thoughts deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Controller for adding a friend using $addToSet 
      async addFriend(req, res) {
        try {
          const course = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.params.friendId} },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Controller for deleting a friend using $pull
      async deleteFriend(req, res) {
        try {
          const course = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {friends: req.params.friendId} },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    }