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
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
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

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;