const controller = require('../controllers/accountController');

module.exports = app => {
    app.route('/accounts').get(controller.get);
    app.route('/accounts/create').post(controller.add);
    app.route('/accounts/remove/:id').delete(controller.remove);
    app.route('/accounts/edit/:id').patch(controller.edit);
};