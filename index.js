const express = require('express');
const app = express();
const port = 8001;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const home = require('./routes/home');
const db =require('./config/mongoose');

//using express to define layouts
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set EJS as the view engine for express
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

//specifying router point
app.use('/', home);

//Middleware to serve static files
app.use(express.static('./assets'));



app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});