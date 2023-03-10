const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const MongoDB_URL = 'mongodb://127.0.0.1/lms_devlopment';

app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('assets'));

app.use(expressLayouts);
//extract layout and scripts from sub pages to layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//set up the view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use(session({
    name: 'LMS',
    secret:'snub,.*qwd$j$@k)mlw{ekfmk:n;fjw7BS5%%&&njdn',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*60*1000
    },
    store: MongoStore.create(
        {
            mongoUrl: MongoDB_URL,
            autoRemove: 'disabled'
        },
        function(err){
            if(err){
                console.log(err || 'connect-mongo running properly');
            }
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/' , require('./routes'));

app.listen(port , function(err){
    if(err){
        console.log(`Error on running the server : ${err}`);
        return;
    }

    console.log(`Server is successfully running at port : ${port}`);
});