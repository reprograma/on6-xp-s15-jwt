const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, (email, senha, done) => {
        // const usuario = buscar no banco dados 
        // se o usuario nao existir, ou estiver vazio, retornar erro "usuario inexistente"
        // se o usuario existe, compara a senha enviada na requisição com a senha do objeto usuario (usuario.senha === senha)
        // se a senha for igual, done(null, usuario)
        // se a senha for diferente - mensagem: 'Usuario/senha errado'
        done(null, {})
    })
);

passport.use(
    new BearerStrategy((token, done) => {
        try {
            //Fluxo feliz
            const payload = jwt.verify(token, 'senha-secreta');
            console.log(payload); //só para verificar o payload retornado
            const usuario = {}; // const usuario = buscar no banco dados 
            done(null, usuario, { token: token });
        } catch (error) {
            //Fluxo com erro
            done(error);   
        }
    })
);