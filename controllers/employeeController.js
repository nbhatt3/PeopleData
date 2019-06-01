const express = require('express');

var router = express.Router();

// DB connect, provide DB name
const mongoose = require('mongoose');
const Employee = mongoose.model('EmployeeDB');

router.get('/', (req,res) => {
        res.render("employee/addOrEdit",{
            viewTitle: "Insert Employee Data"
        });
});

router.post('/', (req,res) => {
      console.log(req.body);
     //if (req.body._id='') 
     insertRecord(req,res);
    // else  
     //updateRecord(req,res);
});

// insert record into MongoDB dataase
function insertRecord(req,res){
    var employee = new Employee();
    employee.fName = req.body.fName;
    employee.lName = req.body.lName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,doc) => {
        if (!err) {
            console.log('Employee Record submitted successfully...');
            res.redirect('employee/list');
         }    
        else{
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                    res.render("employee/addOrEdit",    {
                    viewTitle: "Insert Employee Data",
                    employee: req.body
                     });
            } 
            else 
             console.log('Error Inserting record in MongoDB: '+err);  
        }    
    });
}

function handleValidationError(err,body) {
    for (field in err.errors) {
        switch(err.errors[field].path){
            case 'fName':
                body['fNameError'] = err.errors[field].message;
                break;
            case 'lName':
                body['lNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
                case 'mobile':
                        body['mobileError'] = err.errors[field].message;
                        break;
                    case 'city':
                        body['cityError'] = err.errors[field].message;
                        break;                    
             default:
                 break;
        }
    }
}

// view/list all records from database
router.get('/list', (req,res) => {
    //res.json('from list');
    Employee.find((err, docs) => {
        if(!err) {
            res.render("employee/list",{
                list: docs
            });
        }
        else{
            comsole.log('Error in retreiving employee list :'+err);
        }
    });
});

// update operation - go to addOrEdit page with updated title and selected record data to be shown for update
router.get('/:id', (req,res) => {
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err) {
            res.render("employee/addOrEdit",{
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

// update a record
function  updateRecord(req,res){
    Employee.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err,doc)=>{
            if(!err) { res.redirect('employee/list'); }
            else {
                if(err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("employee/addOrEdit",{
                        viewTitle: 'Update Employee',
                        employee: res.body
                    });
                }
                else 
                console.log('Error during record update: '+ err);
            }
    });
}

//delete operation of a single record
router.get('/delete/:id',(req,res)=>{
    Employee.findOneAndDelete(req.param.id,(err,doc)=>{
            if(!err) {  //no error in delete, show the updated employee list
                res.redirect('/employee/list');
            }
            else{
                  console.log('Error in employee delete operation..'+err);  
            }
    });
});

module.exports = router;