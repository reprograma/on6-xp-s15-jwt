const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const accountsCollection = require('./accountSchema');
const { InvalidArgumentError } = require('../models/errors');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function verificaSenha(senha, senhaHash){
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('Senha inválida!');
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, (email, senha, done) => {
        accountsCollection.findOne({ 'email': email}, async function(err, user) {
            try {
                if(!user) {
                    throw new InvalidArgumentError('Usuário inválido!');
                } 
                await verificaSenha(senha, user.senha);
                console.log(user);
                done(null, user);
            } catch (error) {
                done(error);
            }
            
        });

    })
);

passport.use(
    new BearerStrategy(
        (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                const usuario = accountsCollection.findById(payload.id, (error, account) => { 
                    if(error) { return error; }
                    return account;
                });
                done(null, usuario, { token: token });
            } catch (error) {
                done(error);   
            }
        }
    )
);