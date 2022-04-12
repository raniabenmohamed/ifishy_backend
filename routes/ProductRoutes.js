const express = require ('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const upload = require('../middleware/upload')

router.get('/', ProductController.cawiat)
router.post('/show', ProductController.show)
router.post('/createProduct', ProductController.createProduct)
router.post('/search_product', ProductController.search_product)
router.post('/update', ProductController.update)


module.exports = router 