const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user');
const userpost_controller = require('../controllers/userpost');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);

router.get('/list', user_controller.user_list);

router.post('/create', user_controller.user_create);

router.get('/:id', user_controller.user_details);

router.put('/:id/update', user_controller.user_update);

router.delete('/:id/delete', user_controller.user_delete);


router.get('/post/list', userpost_controller.post_list);

router.get('/post/:id', userpost_controller.post_listcomment);

router.post('/post/create', userpost_controller.post_create);

router.put('/post/:id/create-comment', userpost_controller.create_comment);
router.put('/post/:id/update-comment/:commentId', userpost_controller.update_comment);
router.delete('/post/:id/delete-comment', userpost_controller.delete_comment);

router.put('/post/:id/create-like', userpost_controller.create_like);


module.exports = router;
