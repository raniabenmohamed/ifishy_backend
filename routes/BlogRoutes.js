const express = require ('express')
const router = express.Router()
const BlogController = require('../controllers/BlogController')
const upload = require('../middleware/upload')

router.get('/', BlogController.cawiat)
router.post('/show', BlogController.show)
router.post('/createBlog', BlogController.createBlog)
router.post('/search_blog', BlogController.search_blog)
router.post('/update', BlogController.update)


module.exports = router 