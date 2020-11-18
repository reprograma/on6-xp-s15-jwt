const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const accountsCollection = require('./accountSchema');
const { InvalidArgumentError } = require('../models/errors');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, (email, senha, done) => {
        console.log(process.env.CHAVE_JWT);
        accountsCollection.findOne({ 'email': email}, function(err, user) {
            if (err){
                console.log('Error in SignUp: ' + err);
                return done(err);
            }
            if(!user) {
                throw new InvalidArgumentError('Usuário inválido!');
            } else if(senha != user.senha) {
                throw new InvalidArgumentError('Senha inválida!');
            }
            console.log(user);
            done(null, user);
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