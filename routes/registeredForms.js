const express = require("express");
const data = require("../data");
const router = express.Router();


router.get("/", async(req,res)=>{

    let cookie = req.cookies.name;

    let formSend = [];

    if(cookie){

        if(cookie.includes("user")){

            let formDetails = {};
            let formDetailsArray = [];

            let userId = cookie.replace("user","");

            console.log("*****************************************");

            let formsRegistered = await data.getallRegisteredForms();

            let forms = JSON.parse(JSON.stringify(formsRegistered));

            for(let prop in forms){


                let check = false;

                // console.log(forms[prop].user);

                let users = forms[prop].user;

                if(users.hasOwnProperty("id")){
                    if(users.id != "null" && users.id == userId){

                        check = true;

                    }
                }
                else{

                    // console.log(JSON.parse(JSON.stringify(users))[0].id);

                    let user = JSON.parse(JSON.stringify(users));

                    let numberOfPersonAttending;

                    let nameOfPerson;

                    for(let i in user){
                        if(user[i].id == userId){
                            check = true;
                            nameOfPerson = user[i].name;
                            numberOfPersonAttending = user[i].number;
                            break;
                        }
                    }

                    if(check){

                        // console.log(forms[prop].formId);

                        let formId = forms[prop].formId

                        console.log(typeof formId);

                         formDetails =  await data.getForm(formId);

                         console.log(formDetails.title);

                        //  console.log(JSON.stringify(data.getForm(forms[prop].formId)));

                        formDetails.personName =  nameOfPerson;
                        formDetails.numberOfPersonAttending = numberOfPersonAttending;

                        formDetailsArray.push(formDetails);
                        
                    }

               

                }

      
            }

            

            // console.log(JSON.stringify(checkUserRegistered));
            // console.log(JSON.parse(JSON.stringify(checkUserRegistered)));

            // console.log(formDetails);
            // res.json({message:"trying boss"});

            res.render("registeredForms",{form:formDetailsArray});


        }

        else{
            //admin is trying to logg in

            res.json({message : "admin is trying to logg in"})
        }

    }
    else{
        //user is not logged in

        res.json({message:"user is trying to loggin"});
    }


});

module.exports = router;