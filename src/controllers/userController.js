const jwt = require('jsonwebtoken');

function createToken(user) {
    const payload = {
        id: user.id
    };
    return jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' });
}

module.exports = {

    login: (request, response) => {
        const token = createToken(request.user);
        response.set('Authorization', token);
        response.status(204).send();
    }

};