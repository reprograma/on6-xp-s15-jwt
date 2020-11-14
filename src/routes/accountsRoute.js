const controller = require('../controllers/accountController');
const passport = require('passport');

module.exports = app => {
    app.route('/accounts').get(passport.authenticate('bearer', { session: false }), controller.get);
    app.route('/accounts/create').post(controller.add);
    app.route('/accounts/remove/:id').delete(controller.remove);
    app.route('/accounts/edit/:id').patch(controller.edit);
};