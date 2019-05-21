const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {type: String, required: true, max: 50},
    email: {type: String, required: true, unique:true, lowercase:true, max: 50},
});

// Export the model
module.exports = mongoose.model('User', userSchema);
