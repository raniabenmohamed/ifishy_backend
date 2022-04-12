const express = require ('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const upload = require('../middleware/upload')

router.get('/', PostController.cawiat)
router.post('/show', PostController.show)
router.post('/createPost', PostController.createPost)
router.post('/search_post', PostController.search_post)
router.post('/update', PostController.update)


module.exports = router 