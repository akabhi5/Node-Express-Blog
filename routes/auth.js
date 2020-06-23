const router = require('express').Router();
const { registration, login } = require('../controllers/user');


// Registration
router.post('/register', registration);
router.post('/login', login);


module.exports = router;