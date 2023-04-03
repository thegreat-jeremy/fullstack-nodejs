const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
  },
  address: {
    type: String,
  },
});

// 몽고DB에서 collection 이름을 customers
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
