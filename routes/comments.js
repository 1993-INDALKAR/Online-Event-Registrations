const express = require("express");
const data = require("../data");
const router = express.Router();

const mongoCollections = require("../setting/mongoCollection");
const comment = mongoCollections.comment;


try {

    router.get("/:id", async (req, res) => {

        let cookie = req.cookies.name;

        let formId = req.params.id;

        var userShow = true;

        if (cookie) {

            let showaddComment = "show";
            let userId;



            if (!cookie.includes("user")) {
                showaddComment = "hide";
                userShow = false;
            }
            else {
                userId = cookie.replace("user", "");
            }

            let formDetails = await data.getForm(formId);

            const commentCollection = await comment();

            const form = await commentCollection.findOne({ formId: formId });

            let dataComment = [];

            if (form != null) {
                let comments = form.user;

                console.log(form);

                


                for (let prop in comments) {

                    // console.log(comments[prop]);

                    if (comments[prop].id == userId) {
                        showaddComment = "hide";
                    }

                    // console.log("1");
                    let user = await data.getUser(comments[prop].id);
                    // console.log(user);
                    console.log("2");
                    let fullName = " ";

                    fullName = user.firstName + " " + user.lastName;
                    // console.log("3");

                    let obj = {
                        name: fullName,
                        comment: comments[prop].comment
                    }

                    dataComment.push(obj);



                }
            }




            res.status(200).render("comments", { title: "Comments", userShow:userShow, show: true, dataComment: dataComment, form: formDetails, showaddComment: showaddComment });

        }
        else {
            res.status(403).render("notLogged");
        }



    });


}
catch (e) {
    //internal sever error

    console.log(e);
}

module.exports = router;