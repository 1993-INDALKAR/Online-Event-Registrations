const express = require("express");
const data = require("../data");
const router = express.Router();


try{
    router.get("/",async  (req, res) => {

        // console.log("hi");

        let forms =await  data.getAllForms();
        // forms = JSON.stringify(forms);
        // console.log(typeof forms);
        // console.log(forms[0]);
        // console.log(forms[1]);
        // forms = forms[11];
        // console.log(JSON.stringify(forms));
        // res.status(200).json(forms);
        res.render('admin',{title:'Admin Page-Form Info',form:forms,formInfoActive:"active",createFormActive:""});
    });

    
    
    module.exports = router; 
    }
    catch(e){
        throw console.log("Problem occured in displaying Result Page.");
    }