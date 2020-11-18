const controller = require('../controllers/userController');
const authController = require('../controllers/authController');

module.exports = app => {
    app
        .route('/login')
        .post(authController.local, controller.login);
}
