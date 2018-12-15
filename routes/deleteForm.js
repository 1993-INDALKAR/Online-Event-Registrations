const express = require("express");
const data = require("../data");
const formInfoRoutes = require("./formInfo");
const router = express.Router();

router.post("/:id", async (req, res) => {

    let cookie = req.cookies.name;

    // console.log(cookie);

    if (cookie) {

        if (cookie.includes("admin")) {



            let del = await data.deleteForm(req.params.id);



            let message = {};

            // console.log(del);

            if (del) {

                message.title = "Success";
                message.description = "Successfully Deleted Form."

                console.log("message"+message);

                res.status(200).render("admin", { Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "", modal: "modal" });
                // res.status(200).render('admin', { Message: message, title: 'Admin Page', show: true, formInfoActive: "", createFormActive: "active", modal: "modal",showMessage: true });
                // res.status(200).render("admin", { modal: "modal", Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "" });

            }
            else {

                console.log("message"+message);

                message.title = "Error";
                message.description = "Sorry could not delete form."

                res.status(400).render("admin", { Message: message, title: 'Admin Page', createFormActive: "active", show: true, formInfoActive: "", modal: "modal" });
            }

        }
        else {

            //user is trying to loggin
            res.status(403).render("wrongAccess");

        }

    }
    else {
        //not loggedin
        res.status(403).render("notLogged");
    }







});


module.exports = router; 