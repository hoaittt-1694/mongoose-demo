const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user');
const post_controller = require('../controllers/post');

router.get('/list', user_controller.list_user);
router.post('/create', user_controller.user_create);
router.get('/:id', user_controller.user_detail);
router.put('/:id/update', user_controller.user_update);
router.delete('/:id/delete', user_controller.user_delete);

router.get('/post/list', post_controller.post_list);
router.post('/post/create', post_controller.post_create);
router.put('/post/:id/update', post_controller.post_update);
router.delete('/post/:id/delete', post_controller.post_delete);///////////////////////////////////////

router.get('/post/:id/comments', post_controller.list_comment);
router.get('/post/:id/like', post_controller.post_count_like);
router.get('/:userId/list-post', user_controller.user_list_post);////////////////////////////////////

router.post('/post/:id/create-comment', post_controller.create_comment);
router.put('/post/:postId/update-comment/:commentId', post_controller.update_comment);
router.delete('/post/:postId/delete-comment/:commentId', post_controller.delete_comment);

router.post('/post/:id/create-like', post_controller.create_like);
router.delete('/post/:postId/delete-like/:likeId', post_controller.delete_like);

module.exports = router;
