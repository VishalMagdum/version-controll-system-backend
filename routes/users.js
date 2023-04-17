var express = require('express');
var router = express.Router();
const UserControllers = require('../controllers/user')
const auth = require('../common/auth')

router.post('/signup', UserControllers.Signup)

router.post('/login', UserControllers.Login)

module.exports = router;
