const controller = require('../controllers/offerController');

module.exports = app => {
    app.route('/offers').get(controller.get);
    app.route('/offers/create').post(controller.add);
    app.route('/offers/remove/:id').delete(controller.remove);
    app.route('/offers/edit/:id').patch(controller.edit);
};