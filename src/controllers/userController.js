const jwt = require('jsonwebtoken');

function createToken() {
    const payload = {
        id: 'usuario.id'
    };
    return jwt.sign(payload, 'senha-secreta', { expiresIn: '15m' });
}

module.exports = {

    login: (request, response) => {
        const token = createToken();
        response.set('Authorization', token);
        response.status(204).send();
    }

};