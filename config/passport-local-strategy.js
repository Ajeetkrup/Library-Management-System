const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    async function(email, password, done){
        //finding user and establishing the identity
        try{
            const user = await User.findOne(
                {email: email}
            );

            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        }
        catch(err){
            if(err){
                console.log('Error in finding user --> passport');
            }
            return done(err);
        }
    }
));

passport.serializeUser(function(user, done){
    return done(null, user.id);
});

passport.deserializeUser(async function(id, done){
    try{
        const user = await User.findById(id);

        return done(null, user);
    }
    catch(err){
        console.log('Error in finding user --> passport');
        return done(err);
    }
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/signIn');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;