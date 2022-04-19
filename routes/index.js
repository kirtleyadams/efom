const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const { renderLogin, renderHome } = require('../controllers/userController');

router.get('/', renderHome);
router.get('/home', renderHome);
router.get('/login', renderLogin);

router.use('/api', apiRoutes);

module.exports = router;