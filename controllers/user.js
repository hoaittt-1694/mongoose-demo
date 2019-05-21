const mongoose = require('mongoose');
const User = require('../models/user');
var user = mongoose.model('User');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};



exports.user_list = function (req, res) {
    user.find().then(function (users) {
        res.send(users);
    })
};


exports.user_create = function (req, res) {
    let userN = new user(
        {
            name: req.body.name,
            email: req.body.email
        }
    );

    userN.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the CreatePost."
            });
        });
};


exports.user_details = function (req, res) {
    user.findById(req.params.id, function (err, userD) {
        if (err) return err.message;
        res.send(userD);
    })
};

exports.user_update = function (req, res) {
    user.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, userU) {
        if (err) return err.message;
        res.send('Post updated.');
    });
};


exports.user_delete = function (req, res) {
    user.findByIdAndRemove(req.params.id, function (err) {
        if (err) return err.message;
        res.send('Deleted successfully!');
    })
};

