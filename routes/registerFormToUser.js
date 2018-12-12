const express = require("express");
const data = require("../data");
const router = express.Router();


router.post("/:id",async(req,res)=>{

    // console.log(req.body);

    // console.log(req.params.id);

    let formData = req.body;

    let formId = req.params.id;

    // console.log(req.cookies);

    let cookie = req.cookies.name;

    let userId;

    if(cookie.includes("user")){
         userId = cookie.replace("user","");
    }

    // console.log(userId);

    formData.userId = userId.toString();

    // console.log(data.userId);

    // console.log(data);

    let registerUserToForm = data.registerForm(formData,formId);

    console.log(registerUserToForm);

    if(! registerUserToForm.message){
        res.redirect("/user");
    }
    else{
        res.json({message:"could not add"});
    }

    // if()




});

module.exports = router;