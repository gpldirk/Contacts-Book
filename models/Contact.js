const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId // 当前contact所属的user的id
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },

  type: {
    type: String,
    default: 'personal'  // personal or prefessional
  },

  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Contact', ContactSchema)