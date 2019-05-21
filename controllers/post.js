const mongoose = require('mongoose');
require('../models/user');
require('../models/post');
const User = mongoose.model('User');
var Post = mongoose.model('Post');

exports.post_list = function (req, res) {
    Post.find().then(function (posts) {
        res.send(posts);
    })
};

exports.list_comment = function (req, res) {
    let currentPage = req.body.currentPage || 0;
    let pageSize = req.body.pageSize || 10;
    Post.find({_id: req.params.id}, {comments: {$slice: [pageSize * currentPage, pageSize] }})
        .populate({
            path: 'post.comments',
        })
        .select('post.comments')
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

exports.post_count_like = function (req, res) {
    Post.find({_id: req.params.id})
        .populate({
            path: 'post.likes',
        })
       .select('likes')
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
                    count: data[0].likes.length
                })
            }
        });
};

exports.post_create = function (req, res) {

    const post = new Post({
        author: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        date: Date.now()
    });
    post.save()
        .then(data => {
            res.json({
                status: 200,
                data: data,
                message: 'create post successful'
            });
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating post."
        });
    });
};

exports.post_update = function (req, res) {
    Post.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, post) {
        if (err) return res.status(500).send({
            message: err.message || "Update post fail"
        });
        res.json({
            status: 200,
            message: 'Update post successful'
        });
    });
};

exports.post_delete = function (req, res) {
    Post.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.status(500).send({
            message: err.message || "Update post fail"
        });
        res.json({
            status: 200,
            message: 'Delete post successfully!'
        });
    })
};

exports.create_comment = function (req, res) {
    let commentListToAdd = {
        "user": req.body.user,
        "message": req.body.message,
        "date": Date.now()
    };
    Post.update({_id:req.params.id}, {$push: { comments: commentListToAdd }  }, {}, function (err, user) {
        if (err) return res.status(500).send({
            message: err.message || "Create comment fail"
        });
        res.json({
            status: 200,
            data: user,
            message: 'Create comment successfully!'
        });
    });
};

exports.update_comment = function (req, res) {
    Post.update({'comments._id': req.params.commentId},
        {'$set': {
            'comments.$.message': req.body.message,
        }},
        function(err) {
            if(err){
                return res.status(500).json({'message': err.message});
            }
            return res.status(200).json('Update comment success');
        });
};

exports.delete_comment = function (req, res) {
    let post_id = req.params.postId,
        comment_id = req.params.commentId;

    Post.findByIdAndUpdate(
        post_id,
        { $pull: { 'comments': {  _id: comment_id } } },function(err){
            if(err){
                return res.status(500).json({'message': err.message});
            }
            return res.status(200).json('Delete comment success');
        });
};

exports.create_like = function (req, res) {
    let commentListToAdd = (req.body._id);
    Post.update({_id: req.params.id},
        {$push: {'likes': commentListToAdd}},
        {safe: true, upsert: true},
        function(err, doc) {
            if (err) return res.status(500).send({
                message: err.message || "Create like fail"
            });
            res.json({
                status: 200,
                data: doc,
                message: 'Create like successfully!'
            });
        }
    );
};

exports.delete_like = function (req, res) {
    let post_id = req.params.postId,
        like_id = req.params.likeId;
    Post.findByIdAndUpdate(
        post_id,
        { $pull: { likes: like_id } },function(err,model){
            if(err){
                return res.status(500).json({'message': err.message});
            }
            return res.status(200).json('Delete like success');
        });
};


