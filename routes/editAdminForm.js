const express = require("express");
const data = require("../data");
const router = express.Router();


router.post("/:id", async (req, res) => {

    let cookie = req.cookies.name;

    // if (cookie) {

    //     if (cookie.includes("admin")) {

            let message = {};

            let form = req.body;
            let body = req.body;
            let formId = req.params.id;

            
        if (body.name.length == 0) {

            console.log(body.eventName.length);
            message.description = "Event Name is Empty. Could not create Form.";

        }
        else if (body.location.length == 0) {
           
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

        else{

            if (form.age == "option1") {
                form.age = true;
            }
            else {
                form.age = false;
            }

            if (form.gender == "option1") {
                form.gender = "M";
            }
            else if (form.age == "option2") {
                form.gender = "F";
            }
            else{
                form.gender = "MF";
            }

            let edit = await data.replaceForm(formId, form);

            

            if (edit.hasOwnProperty("message")) {


                message.title = "Error";
                message.description = "Sorry could not update form."

                //error occured
                res.status(403).render("admin", { Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "", modal: "modal" });
            }
            else {

                message.title = "Success";
                message.description = "Successfully Updated Form."

                res.status(200).render("admin", { modal: "modal", Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "" });

            }


        }

            


    //     }
    //     else {
    //         //user is trying to access
    //     }

    // }
    // else {
    //     //user is not logged in
    // }


});


module.exports = router;