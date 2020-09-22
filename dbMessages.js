const mongoose = require('mongoose')

const messengerSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: Array,
    received: Boolean,
    rooms: String
})
//collection
const exportMachine = mongoose.model('messagecontents', messengerSchema)

module.exports = exportMachine