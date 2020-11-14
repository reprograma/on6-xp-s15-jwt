const route = require('./src/routes');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Reprograma - Bem vindas à plataforma { Feita Por Mulheres }')
    });
    
    route.accountsRoute(app);
    route.offersRoute(app);
    route.userRoute(app);
};