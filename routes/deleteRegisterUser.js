const express = require("express");
const data = require("../data");
const router = express.Router();

try {

    router.get("/:id", async (req, res) => {

        let cookie = req.cookies.name;
        if (cookie) {

            // console.log("1");

            if (cookie.includes("user")) {

                // console.log("2");

                let formId = req.params.id;

                let userId = cookie.replace("user", "");

                let del = await data.deleteRegisterUserFromForm(formId, userId);

                if (del.hasOwnProperty("message")) {

                    let message = "notDeleted";

                    res.redirect('/user?message=' + message);

                }
                else {

                    let message = "deleted";

                    res.redirect('/user?message=' + message);

                    // res.redirect("/user");
                }




            }
            else {

                //admin loggin error

                res.status(403).render("wrongAccess");

            }





        }
        else {
            //not loggedin

            // console.log("3");

            res.status(403).render("notLogged");
        }



    })

    module.exports = router;
}
catch (e) {
    console.log(e);
}


