const { Schema, model } = require('mongoose');

// Schema to create a course model
const userSchema = new Schema(
  {
    // Sets properties for username 
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    thoughts: [
      {
          type: Schema.Types.ObjectId,
          ref: "Thought"
      },
  ],
  friends: [
      {
          type: Schema.Types.ObjectId,
          ref: "User"
      },
  ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;