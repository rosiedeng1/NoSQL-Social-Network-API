const { Schema, Types, model } = require('mongoose');
// Imported format.js for time stamps 
const formatDate = require('../utils/format.js')

// Reaction field's subdocument schema in Thought model 
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => formatDate(date) 
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      minlength: 1,

    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
