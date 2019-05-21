const mongoose = require('mongoose');
const a = require('../models/user');
let user = mongoose.model('User');
const b = require('../models/userpost');
var userpost = mongoose.model('Userpost');


exports.post_list = function (req, res) {
    userpost.find().then(function (posts) {
        res.send(posts);
    })
};


exports.post_listcomment = function (req, res) {
    // let currentPage = req.body.currentPage || 1;
    // let pageSize = req.body.pageSize || 4;
    // userpost.find({_id: req.params.id})
    //     .select('comments')
    //     .limit(pageSize)
    //     .skip((currentPage - 1) * pageSize)
    //     .exec(
    //         function(err, data) {
    //         userpost.count(function(err, total_count){
    //             console.log(data);
    //             if (err) {
    //                 res.json({
    //                     status: 401,
    //                     message: 'something went wrong!',
    //                     err: err,
    //                 })
    //             } else {
    //                 console.log(total_count);
    //                 res.json({
    //                     status: 200,
    //                     data: data,
    //                     pageSize: pageSize,
    //                     pages: total_count / pageSize,
    //                 })
    //             }
    //         })
    //     });

    let currentPage = req.body.currentPage || 0;
    let pageSize = req.body.pageSize || 10;
    userpost.find({_id: req.params.id}, {comments: {$slice: [pageSize * currentPage, pageSize] }})
        .populate({
            path: 'userpost.comments',
        })
        //.select('userpost.comments')
        .exec(function(err, data) {
            if (err) {
                res.json({
                    status: 401,
                    message: 'something went wrong!',
                    err: err,
                })
            } else {
                res.json({
                    status: 200,
                    data: data,
                })
            }
        });
};


exports.post_create = function (req, res) {
    const post = new userpost({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        date: Date.now()
    });
    post.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the CreatePost."
        });
    });
};


exports.create_comment = function (req, res) {
    let commentListToAdd = [{
        "user": req.body.user,
        "message": req.body.message,
        "date": Date.now()
    }];
    userpost.update({_id:req.params.id}, {$push: { comments: commentListToAdd }  }, {}, function (err, user) {
        console.log(commentListToAdd);
        if (err) return err.message;
        res.send(user);
    });
};

exports.update_comment = function (req, res) {
    let commentListToAdd = [{
        "user": req.body.user,
        "message": req.body.message,
        "date": Date.now()
    }];
    userpost.update({_id:req.params.id}, {$push: { comments: commentListToAdd }  }, {}, function (err, user) {
        console.log(commentListToAdd);
        if (err) return err.message;
        res.send(user);
    });
};

exports.delete_comment = function (req, res) {
    let commentListToAdd = [{
        "user": req.body.user,
        "message": req.body.message,
        "date": Date.now()
    }];
    userpost.update({_id:req.params.id}, {$push: { comments: commentListToAdd }  }, {}, function (err, user) {
        console.log(commentListToAdd);
        if (err) return err.message;
        res.send(user);
    });
};


exports.create_like = function (req, res) {
    let commentListToAdd = (req.body._id);
    userpost.update({_id: req.params.id},
        {$push: {'likes': commentListToAdd}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                return res.status(500).json({'msg': 'fail'});
            }else{
                return res.status(200).json({'msg': 'success'});
            }
        }
    );
};


exports.user_details = function (req, res) {
    userpost.findById(req.params.id, function (err, post) {
        if (err) return err.message;
        res.send(post);
    })
};

exports.user_update = function (req, res) {
    userpost.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return err.message;
        res.send('Post updated.');
    });
};


exports.user_delete = function (req, res) {
    userpost.findByIdAndRemove(req.params.id, function (err) {
        if (err) return err.message;
        res.send('Deleted successfully!');
    })
};

