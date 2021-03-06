const express = require ('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const upload = require('../middleware/upload')

router.get('/', PostController.cawiat)
router.get('/show', PostController.show)
router.post('/createPost',upload.single('photo') ,PostController.createPost)
router.post('/search_post', PostController.search_post)
router.post('/update', PostController.update)


module.exports = router 