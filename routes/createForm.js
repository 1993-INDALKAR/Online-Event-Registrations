const express = require("express");
const data = require("../data");
const router = express.Router();


try{
    router.post("/",async  (req, res) => {

        console.log(req.body);

        //***************************************************** */
        let insert =await  data.createForm(req.body);

        console.log("**********88");
        // console.log( Promise.resolve(data.isEmpty(insert)));
        
        let objectEmpty = true;
        await isEmpty(insert);
        // console.log(objectEmpty);

        if(!objectEmpty){
            
            res.status(200).render('admin',{title:'Admin Page',show:true,formInfoActive:"",createFormActive:"active"});
            // res.status(200).json(insert);
        }
        else{
            // console.log(data.isEmpty(insert));
        }

        function isEmpty(obj) {

            // console.log(obj);

            for (var key in obj) {
                if (obj.hasOwnProperty(key)){
                    objectEmpty = false;
                break;
                }
                
            }
        }

        // res.status(200).json(insert);
        // res.render('admin',{title:'Admin Page',show:true});
        //*****************************************************8 */
    
    });

    
    
    module.exports = router; 
    }
    catch(e){
        throw console.log("Problem occured in displaying Result Page.");
    }