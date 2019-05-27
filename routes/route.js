const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user');
const post_controller = require('../controllers/post');

router.get('/list', user_controller.list_user);
router.post('/create', user_controller.create_user);
router.get('/:id', user_controller.user_detail);
router.put('/:id/update', user_controller.update_user);
router.delete('/:id/delete', user_controller.delete_user);
router.get('/:userId/list-post', user_controller.user_list_post);

router.get('/post/list', post_controller.list_post);
router.post('/post/create', post_controller.create_post);
router.put('/post/:id/update', post_controller.update_post);
router.delete('/post/:id/delete', post_controller.delete_post);

router.get('/post/:id/comments', post_controller.list_comment);
router.post('/post/:id/create-comment', post_controller.create_comment);
router.put('/post/:postId/update-comment/:commentId', post_controller.update_comment);
router.delete('/post/:postId/delete-comment/:commentId', post_controller.delete_comment);

router.get('/post/:id/like', post_controller.post_count_like);
router.post('/post/:id/create-like', post_controller.create_like);
router.delete('/post/:postId/delete-like/:likeId', post_controller.delete_like);

router.get('/post/gt-five-comment', post_controller.get_post_gt_five_comment);
router.get('/post/five-comment-nearest', post_controller.get_post_five_comment_nearest);
router.get('/post/:id/user-like-post', post_controller.get_user_like_a_post);
router.get('/post/:id/user-unlike-post', post_controller.get_user_unlike_a_post);
router.get('/post/:id/user-comment-post', post_controller.get_user_comment_a_post);

module.exports = router;
