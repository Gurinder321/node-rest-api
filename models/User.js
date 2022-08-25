const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    state: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    network: {
      type: String,
      default: '',
    },
    industry: {
      type: String,
      default: '',
    },
    amount: {
      type: String,
      default: '',
    },
    profileImage: {
      type: String,
      default: '',
    },
    adHeadline: {
      type: String,
      default: '',
      min: 15,
    },
    profileAd: {
      type: String,
      default: '',
      max: 50,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
