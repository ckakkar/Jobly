//const { authenticate } = require('passport/lib')

const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')

function initialize(passport, getUserByName, getUserById){
    const authenticateUser = async (name,password, done) => {
        const user = getUserByName(name)
        if (user == null){
            return done(null, false, {message: 'No user with that username'})
        }
        try{
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message: 'Incorrect password'})
            }
        }catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'name'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize


//how to call this version put itt under index.js aka the server
// const initializePassport = require('./passportsettings')
// initializePassport(
//   passport,
//   name => users.find(user => user.name === name),
//   id => 
//   users.find(user => user.id === id)
//   )