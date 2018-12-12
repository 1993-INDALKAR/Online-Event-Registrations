const express = require("express");
const data = require("../data");
const router = express.Router();

router.get("/:id",async(req,res)=>{
    // console.log(req.params.id);
    // console.log("ok");

    let formId = req.params.id;
    let formDetail = await data.getForm(formId);

    

    res.render("registrationForm",{title:"Form Registration",form:formDetail,show:true});
});


module.exports = router;