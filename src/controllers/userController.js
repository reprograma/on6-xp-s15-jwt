const jwt = require('jsonwebtoken');

function createToken() {
    const payload = {
        id: 'usuario.id'
    };
    return jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' });
}

module.exports = {

    login: (request, response) => {
        const token = createToken();
        response.set('Authorization', token);
        response.status(204).send();
    }

};