const express = require("express");
const data = require("../data");
const router = express.Router();
const path = require("path");

try{
    router.get("/",async  (req, res) => {

        // console.log("hi");

        let forms =await  data.getAllForms();
        // console.log(forms);
        for(let prop in forms){

            if(forms[prop].ageRestriction == true){
                forms[prop].ageRestriction = "Below 18 Years";
            }
            else{
                forms[prop].ageRestriction = "No Age Restriction"
            }

            if(forms[prop].genderRestriction == "M"){
                forms[prop].genderRestriction = "Male Event"
            }
            else if(forms[prop].genderRestriction == "F"){
                forms[prop].genderRestriction = "Female Event"
            }
            else{
                forms[prop].genderRestriction = "Male/Female Event"
            }

        }
        if(forms.length>0){
            res.render('admin',{title:'Admin Page-Form Info',form:forms,show:true,formInfoActive:"active",createFormActive:"",empty:false});
        }
        else{

            res.render('admin',{title:'Admin Page-Form Info',form:forms,show:true,formInfoActive:"active",createFormActive:"",empty:true});
        }
       
    });

    
    
    module.exports = router; 
    }
    catch(e){
        throw console.log("Problem occured in displaying Result Page.");
    }