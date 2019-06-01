var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useNewUrlParser: true}, function (err) {
    if (err) throw err;
    console.log('MongoDB Successfully connected...');
});

require('./employee.model');