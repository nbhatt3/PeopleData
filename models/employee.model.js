const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: 'First Name is required'
    },
    lName: {
        type: String,
        required: 'Last Name is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    mobile: {
        type: String,
       required: 'Mobile number is required'
    },
    city:{
        type: String,
       required: 'City is required'    
    }
});

mongoose.model('EmployeeDB', employeeSchema); 