const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {type: String, required: true, max: 50},
    email: {type: String, required: true, unique:true, lowercase:true, max: 50},
    //posts:[{type:Schema.Types.ObjectId, ref: 'Userpost'}]
});

// Export the model
module.exports = mongoose.model('User', userSchema);
