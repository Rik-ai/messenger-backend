const mongoose = require('mongoose')

const messengerSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
})
//collection
const exportMachine = mongoose.model('messagecontents', messengerSchema)

module.exports = exportMachine