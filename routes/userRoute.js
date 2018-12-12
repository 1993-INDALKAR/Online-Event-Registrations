const express = require("express");
const data = require("../data");
const bcrypt = require('bcrypt');
const router = express.Router();


router.get("/", async (req, res) => {

    let cookie = req.cookies.name;
    if (cookie) {

        let userId;

        if (cookie.includes("user")) {
            userId = cookie.replace("user", "");

            console.log("user id:"+userId);
        

        let forms = await data.getAllForms();

        let updateForms = [];

        for(let prop in forms){
            // console.log(prop);
            // console.log("form id:" + forms[prop]._id);
            let formExist = await data.checkFormRegisteredByUser(forms[prop]._id);
            // console.log("324567890");
            // console.log(JSON.stringify(formExist));
            // console.log(JSON.stringify(formExist).hasOwnProperty('user'));

            if(!JSON.stringify(formExist).hasOwnProperty('user') && JSON.stringify(formExist) != "null"){

                // console.log(JSON.parse(JSON.stringify(formExist)));
                // console.log("%%%%%%%%%%%%%%");
                // console.log(JSON.stringify(formExist));
                
                // let obj = JSON.parse(JSON.stringify(formExist)).user.find(o => o.id === userId);

                let flag = true;
                let obj = JSON.parse(JSON.stringify(formExist)).user;

                for(let a in obj){

                    if(obj[a].id == userId ){
                        flag = false;
                    }
                }



                // console.log("object"+JSON.parse(JSON.stringify(formExist)).user[0].id);

                if(flag){
                    updateForms.push(forms[prop]);
                }
            }
            else{
                console.log(forms[prop]);
                updateForms.push(forms[prop]);
            }



        }


        // console.log(forms);
        res.render('user', { title: 'User Page', form: updateForms, show: true,homeActive:"active",userShow:true });

    }
    else{
        //error for admin cookie

        res.json({message:"admin login"});
    }

    }
    else {

        //error for no cookie
        res.json({message:"user not login"});

    }


});


module.exports = router;