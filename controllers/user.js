const mongoose = require('mongoose');
require('../models/user');
var User = mongoose.model('User');

exports.list_user = function (req, res) {
    User.find().then(function (users) {
        res.send(users);
    })
};

exports.user_create = function (req, res) {
    let userN = new User(
        {
            name: req.body.name,
            email: req.body.email
        }
    );

    userN.save()
        .then(data => {
            res.json({
                status: 200,
                data: data,
                message: 'create user successful'
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating user"
            });
        });
};

exports.user_detail = function (req, res) {
    User.findById(req.params.id, function (err, userD) {
        if (err) return res.status(500).send({
            message: err.message || "Not found user"
        });
        res.status(200).json(userD);
    })
};

exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        if (err) return res.status(500).send({
            message: err.message || "Update user fail"
        });
        res.json({
            status: 200,
            message: 'Update user successful'
        });
    });
};


exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.status(500).send({
            message: err.message || "Delete user fail"
        });
        res.json({
            status: 200,
            message: 'Delete user successful'
        });
    })
};

exports.user_list_post = function (req, res) {

};

