const express = require("express");
const data = require("../data");
const formInfoRoutes = require("./formInfo");
const router = express.Router();

router.delete("/:id", async (req, res) => {

    let cookie = req.cookies.name;

    // if (cookie) {

    //     if (cookie.name == "admin") {



            let del = await data.deleteForm(req.params.id);



            let message = {};


            if (del) {

                message.title = "Success";
                message.description = "Successfully Deleted Form."

                res.status(200).render("admin", { Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "", modal: "modal",showMessage: true });
                // res.status(200).render('admin', { Message: message, title: 'Admin Page', show: true, formInfoActive: "", createFormActive: "active", modal: "modal",showMessage: true });

            }
            else {

                message.title = "Error";
                message.description = "Sorry could not delete form."

                res.status(400).render("admin", { Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "", modal: "modal" });
            }

    //     }
    //     else {

    //         //user is trying to loggin

    //     }

    // }
    // else {
    //     //not loggedin
    // }







});


module.exports = router; 