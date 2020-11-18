const passport = require('passport');

module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            'local',
            { session: false },
            (erro, usuario, info) => {
                if(erro) {
                    if(erro.name === 'InvalidArgumentError') {
                        return res.status(401).json({erro: erro.message});
                    } else {
                        return res.status(500).json({erro: erro.message});
                    }
                } else if(!usuario) {
                    return res.status(401).json();
                }

                req.user = usuario;
                return next();
            }
        )(req, res, next);
    },

    bearer: (req, res, next) => {
        passport.authenticate(
            'bearer',
            { session: false },
            (erro, usuario, info) => {
                if(erro) {
                    if(erro.name === 'JsonWebTokenError') {
                        return res.status(401).json({erro: erro.message});
                    } else if(erro.name === 'TokenExpiredError') {
                        return res.status(401).json({erro: erro.message, expiradoEm: erro.expiredAt});
                    } else {
                        return res.status(500).json({erro: erro.message});
                    }
                } else if(!usuario) {
                    return res.status(401).json();
                }

                req.token = info.token;
                req.user = usuario;
                return next();
            }
        )(req, res, next);
    }
}