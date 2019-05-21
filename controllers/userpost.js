const mongoose = require('mongoose');
const a = require('../models/user');
const user = mongoose.model('User');
const b = require('../models/userpost');
var userpost = mongoose.model('Userpost');

exports.post_list = function (req, res) {
    userpost.find().then(function (posts) {
        res.send(posts);
    })
};

exports.post_listcomment = function (req, res) {
    let currentPage = req.body.currentPage || 0;
    let pageSize = req.body.pageSize || 10;
    userpost.find({_id: req.params.id}, {comments: {$slice: [pageSize * currentPage, pageSize] }})
        .populate({
            path: 'userpost.comments',
        })
        .select('userpost.comments')
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
    userpost.update({'comments._id': req.params.commentId},
        {'$set': {
            'comments.$.message': req.body.message,
        }},
        function(err,model) {
            if(err){
                return res.status(500).json({'message': err.message});
            }
            return res.status(200).json(model);
        });
};

exports.delete_comment = function (req, res) {
    let post_id = req.params.postId,
        comment_id = req.params.commentId;
    console.log(post_id, comment_id);

    userpost.findByIdAndUpdate(
        post_id,
        { $pull: { 'comments': {  _id: comment_id } } },function(err,model){
            if(err){
                return res.status(500).json({'message': err.message});
            }
            return res.status(200).json('Delete comment success');
        });
};

exports.create_like = function (req, res) {
    let commentListToAdd = (req.body._id);
    userpost.update({_id: req.params.id},
        {$push: {'likes': commentListToAdd}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                return res.status(500).json({'message': 'fail'});
            }else{
                return res.status(200).json({'message': 'success'});
            }
        }
    );
};


