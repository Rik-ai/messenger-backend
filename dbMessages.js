const mongoose = require('mongoose')

const messengerSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
})

const exportMachine = mongoose.model('messageContent', messengerSchema)

module.exports = exportMachine