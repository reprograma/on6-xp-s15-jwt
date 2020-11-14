const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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