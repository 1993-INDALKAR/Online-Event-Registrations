const express = require("express");
const data = require("../data");
const router = express.Router();


router.post("/:id", async (req, res) => {

    let edit = await data.editForm(req.params.id);

    // let del = await data.deleteForm(req.params.id);

    console.log(del);

    if (del) {

        let forms = await data.getAllForms();
        res.render('admin', { title: 'Admin Page-Form Info', form: forms, formInfoActive: "active", createFormActive: "" });

    }



    


});


module.exports = router;