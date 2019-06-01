require('./models/db');

const express = require('express');
var app= express();

// use middleware for getting data from form using post method
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
       extended: true 
}));
app.use(bodyParser.json());

const path = require('path');
// add express handlerbars 
const exphbs = require('express-handlebars');

//setting for view
app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs', exphbs({extname:'hbs',defaultLayout:'mainLayout', layoutsDir:__dirname +'/views/layouts/'}));
app.set('view engine','hbs');

// add router 
const employeeController = require('./controllers/employeeController');

app.listen(3000, ()=>{
    console.log('Express server started at port: 3000');
});

// use router, set employee page as employeeController 
app.use('/employee',employeeController);


