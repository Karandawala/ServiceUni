const mongoose = require('mongoose')

module.exports = mongoose.model('Postal', {
    delieveryDate: { type: String },
    status: { type: String },
})