const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    dueDate: String,
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('items', itemSchema);