const passport = require('passport');
const User = require('../../models/User');

module.exports = (() => {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        User.findByUserName(username)
            .then((user) => {
                return done(null, user);
            })
            .catch((er) => {
                return done(err, null);
            });
    });
    
    return passport;
});