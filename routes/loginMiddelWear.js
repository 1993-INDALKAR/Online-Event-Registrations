const express = require("express");
const data = require("../data");
const bcrypt = require('bcrypt');
const router = express.Router();


router.post("/", async (req, res) => {

    let errorLogin = "";

    let email = req.body.email;

    let userExist = await data.checkEmail(email);

    // console.log(userExist);

    if (JSON.stringify(userExist).length > 0 && userExist != null) {

        // let users = await data.getAllUsers();

        // console.log(JSON.stringify(userExist));


        let user = JSON.parse(JSON.stringify(userExist));

        let password = req.body.password;

        // console.log(user);

        let passwordCheck = await bcrypt.compareSync(password,user.password);

        // console.log(user.password);

        if(passwordCheck){

            let type =  "";

            if(user.type == "U"){

                type = "user"
                res.cookie('name', `${type}${user._id}`);
                res.redirect("/user");
            }
            else{

                type = "admin";
                res.cookie('name', `${type}${user._id}`);
                res.redirect("/admin");
            }

            // res.cookie('name', `${type}${user._id}`);

            // res.redirect("/user");

        }
        else{

            errorLogin = "Username or Password incorrect";
            res.render('login',{title:'Login Page',show:false,errorLogin:errorLogin});

        }



        // for (let prop in userArr) {

        //     console.log(userArr[prop]);

        //     await bcrypt.compareSync(userArr[prop].email, hash)
        // }

    }
    else {

        // error.push("Username or Password incorrect");
        errorLogin = "Username or Password incorrect";
        res.render('login',{title:'Login Page',show:false,errorLogin:errorLogin});

    }



});

module.exports = router;