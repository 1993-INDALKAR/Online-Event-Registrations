const express = require("express");
const data = require("../data");
const router = express.Router();
const path = require("path");

try{
    router.get("/",async  (req, res) => {

        // console.log("hi");

        let forms =await  data.getAllForms();
        // console.log(forms);
        if(forms.length>0){
            res.render('admin',{title:'Admin Page-Form Info',form:forms,formInfoActive:"active",createFormActive:"",empty:false});
        }
        else{

            res.render('admin',{title:'Admin Page-Form Info',form:forms,formInfoActive:"active",createFormActive:"",empty:true});
        }
       
    });

    
    
    module.exports = router; 
    }
    catch(e){
        throw console.log("Problem occured in displaying Result Page.");
    }