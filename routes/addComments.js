const express = require("express");
const data = require("../data");
const router = express.Router();


try{


    router.post("/:id",async(req,res)=>{

        let cookie = req.cookies.name;

        if(cookie){

            if(cookie.includes("user")){

                let comment = req.body.comments;

                let formID = req.params.id;

                let userId = cookie.replace("user","");

                console.log(comment);
                console.log(formID);
                console.log(userId);

                let addComment = await data.addComment(comment,userId,formID);

                console.log(addComment);

                res.redirect("user");




            }
            else{
                //admin doesnt have right to add comments
            }

        }
        else{

            //please logg in first
        }

    });

}

catch(e){
    
    //internal error occured
}

module.exports = router;