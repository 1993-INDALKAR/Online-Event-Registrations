const express = require("express");
const data = require("../data");
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/",async(req,res)=>{
    // console.log(req.body);
    let error = [];

    let firstName = req.body.First_Name;
    let lastName = req.body.Last_Name;
    let email = req.body.email;
    let password = req.body.password;
    let rePassword = req.body.repassword;
    let dob = req.body.dob;

    if(/[^a-zA-Z]/.test(firstName)){
        error.push("First Name contains Number. Please enter correct Name.");
    }

    if(/[^a-zA-Z]/.test(firstName)){
        error.push("Last Name contains Number. Please enter correct Name.");
    }

    if(password !== rePassword)
    {
        error.push("Password and Confirm Passowrd are different.");
    }else if(password.length < 8){
        error.push("Pasword should be at least 8 characters");
    }

    let year = dob.split('-')[0] ;
    // console.log(year);
    let currentTime = new Date();
    // console.log(parseInt(year));
    // console.log(parseInt(currentTime.getFullYear()));

    if(parseInt(year) >  parseInt(currentTime.getFullYear())){

        error.push("Year of birth should be less than current year");

    }

    let userExist = await data.checkEmail(email);

    // console.log(JSON.stringify(userExist));
    console.log(userExist);

    if(JSON.stringify(userExist).length>0 && userExist != null){

        // console.log();
        error.push("A User with same E-mail Id already exists");
    }

   

    // for()

    if(error.length>0){
        res.render('login',{title:'Login Page',show:false,error:error});
    }
    else{

        let userObj = {};

        userObj.firstName = firstName;
        userObj.lastName = lastName;
        userObj.email = email;
        userObj.password = password;
        userObj.dob = dob;

        

        let registerUser = await data.createUser(userObj);

        if(registerUser.message){

            console.log(registerUser.message);
            error = [];
            error.push("Could not create User. Try after sometime.")
            res.render('login',{title:'Login Page',show:false,error:error});
        }
        else{
            console.log(registerUser);
            res.render('login',{title:'Login Page',show:false,success:true,successMessage:"User Created Successfully."});
        }


    }





});

module.exports = router;