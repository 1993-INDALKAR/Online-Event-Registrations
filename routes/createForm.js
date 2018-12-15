const express = require("express");
const data = require("../data");
const router = express.Router();


try {
    router.post("/", async (req, res) => {

        // let cookie = req.cookies.name;

        // if (cookie) {

        //     if (cookie.includes("admin")) {

        let body = req.body;

        let message = {};

        

  

        if (body.eventName.length == 0) {

            console.log(body.eventName.length);
            message.description = "Event Name is Empty. Could not create Form.";

        }
        else if (body.eventPlace.length == 0) {
           
            message.description = "Event Locationis Empty. Could not create Form.";

        }
        else if (body.eventDate.length == 0) {

            message.description = "Event Date is Empty. Could not create Form."

        }
        else if (body.eventTime.length == 0) {

            message.description = "Event Time is Empty. Could not create Form."

        }
        else if (body.noOfSeats.length == 0) {

            message.description = "Event Acomodation seats is Empty. Could not create Form."

        }
        else if(body.noOfSeats.includes("-")){

            message.description = "Event Acomodation seats Cannot be Negative. Could not create Form."

        }
        else if (body.age.length == 0) {

            message.description = "Age restriction is Empty. Could not create Form."

        }
        else if (body.gender.length == 0) {

            message.description = "Gender Restriction is Empty. Could not create Form."

        }
        else if (body.description.length == 0) {

            message.description = "Event Description is Empty. Could not create Form."

        }

        if (message.hasOwnProperty("description")) {

            message.title = "Error";

            res.status(400).render('admin', { Message: message, modal: "modal", title: 'Admin Page', show: true, showMessage: true, formInfoActive: "", createFormActive: "active" });


        }
        else {

            let insert = await data.createForm(req.body);



            let objectEmpty = true;
            await isEmpty(insert);


            if (!insert.hasOwnProperty("message")) {

                message.title = "Success";
                message.description = "Successfully Created Form."

                res.status(200).render('admin', { Message: message, modal: "modal", title: 'Admin Page', show: true, showMessage: true, formInfoActive: "", createFormActive: "active" });

            }
            else {

                message.title = "Error";
                message.description = "Sorry could not Create form."


                res.status(400).render('admin', { Message: message, show: true, modal: "modal", title: 'Admin Page', showMessage: true, formInfoActive: "", createFormActive: "active" });
            }

            function isEmpty(obj) {



                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        objectEmpty = false;
                        break;
                    }

                }
            }

        }




        // }
        // else {
        // // user trying to loggin
        // }


        // }
        // else {
        // // not logged in

        // }





    });




}
catch (e) {
    throw console.log("Problem occured in displaying Result Page.");
}

module.exports = router;


