const express = require ('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const authenticate = require('../middleware/authenticate')

router.get('/', UserController.index)
router.post('/show', UserController.show)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/update', UserController.update)
router.post('/search', UserController.search_user)


module.exports = router 