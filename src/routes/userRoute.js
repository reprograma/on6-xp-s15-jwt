const controller = require('../controllers/userController');

module.exports = app => {
    app.route('/login').post(controller.login);
}