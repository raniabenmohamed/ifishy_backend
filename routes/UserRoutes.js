const express = require ('express')
const router = express.Router()

const UserController = require('../controllers/UserController')


router.get('/', UserController.index)
router.post('/show', UserController.show)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post("/reEnvoyerConfirmationEmail", UserController.reEnvoyerConfirmationEmail);
router.get("/confirmation/:token", UserController.confirmation);
router.post("/motDePasseOublie", UserController.motDePasseOublie);
router.put("/changerMotDePasse", UserController.changerMotDePasse);
// router.post('/update', UserController.update)
// router.post('/search', UserController.search_user)
router.put("/updateProfile", UserController.updateProfile);



module.exports = router 