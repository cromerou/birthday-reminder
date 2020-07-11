const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: String,
    lastName: String,
    birthday: String,
    sex: String,
    icon: String,
    color: String,
    groupId: String
});

module.exports = mongoose.model('Member', memberSchema);