let mongoose = require('mongoose');

let accountSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['checking', 'savings', 'investment'],
    required: true
  },
  transaction: {
    type: {
      type: String,
      enum: ['deposit', 'transfer', 'billpay']
    },
    amount: {
      type: Number
    }
  }
});

let userSchema = mongoose.Schema({
  lastname: { type: String, required: true, unique: true },
  accounts: accountSchema
});

var Customer = mongoose.model('User', userSchema);

module.exports = Customer;
