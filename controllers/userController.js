const User = require('../models/user');

module.exports.profile = async function(req, res){
    const user = await User.findById(req.params.id);

    if(user != null){
        return res.render('user_profile', {
            title: 'Profile',
            profile_user: user
        });
    }
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('signIn', {
        title: 'SignIn'
    });
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('signUp', {
        title: 'SignUp'
    });
}

module.exports.create = async function(req, res){
    console.log(req.body);
    const user = await User.findOne({email: req.body.email});
    console.log(user);
    if(user == null){
        User.create(req.body);

        return res.redirect('/');
    }
    else{
        return res.render('signIn', {
            title: 'SignIn'
        });
    }
}

//create user session and login
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(
        function(err){
            if(err){
                console.log(err);
                return;
            }

            return res.redirect('/');
        }
    );
}