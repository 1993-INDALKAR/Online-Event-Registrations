const express = require("express");
const data = require("../data");
const router = express.Router();
let fs = require("fs");
let path = require("path");
let nodemailer = require("nodemailer");

try {

    router.post("/:id", async (req, res) => {



        let cookie = req.cookies.name;

        if (cookie) {

            if (cookie.includes("user")) {


                let userid = cookie.replace("user", "");

                let dataComment = req.body;

                console.log(dataComment);

                let formId = req.params.id;

                


                let update = await data.updateUserRegisteredEvent(dataComment, formId, userid);

               

                if (!update.hasOwnProperty("message")) {

                    let message = "updated";

                    let userInfo = await data.getUser(userid);

                    let emailId = userInfo.email;

                    let fileName = "formRegisterd.txt";

                    let filePath = path.join(__dirname, "../public", fileName);


                    let content = "";

                    fs.readFile(filePath, 'utf8', function read(err, data) {
                        if (err) {
                            throw console.log(err);
                        }

                        content = data;

                        content = content.replace("&name&", dataComment.name);
                        content = content.replace("&number&", dataComment.number);

                        let transporter = nodemailer.createTransport({
                            service: 'outlook',
                            auth: {
                                user: 'hindalka@stevens.edu',
                                pass: 'Stevens139158'
                            }
                        });

                        let mailOptions = {
                            from: 'hindalka@stevens.edu',
                            to: emailId,
                            subject: "Successfully registered for Event",
                            text: content
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    });


                    res.redirect('/user?message=' + message);

                }
                else {

                    let message = "notUpdated";

                    res.redirect('/user?message=' + message);

                }




            }
            else {
                res.status(403).render("wrongAccess");
            }

        }
        else {
            res.status(403).render("notLogged");
        }

    });
}
catch (e) {

}

module.exports = router;