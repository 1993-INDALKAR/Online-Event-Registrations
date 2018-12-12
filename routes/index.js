const createFormRoutes = require("./createForm");
const formInfoRoutes = require("./formInfo");
const deleteFormRoutes = require("./deleteForm");
const editFormAdminRoutes = require("./editAdminForm");
const registerFormRoutes = require("./registerForm");
const registrationUserRoutes = require("./registerUser");
const registerFormToUserRoutes = require("./registerFormToUser");
const loginMiddelWearRoutes = require("./loginMiddelWear");
const registeredFormsRoutes = require("./registeredForms");
const userRoutes = require("./userRoute");
const data = require("../data");
const path = require("path");
const express = require("express");
const router = express.Router();


try{
    const constructorMethod =app =>{

        
        
        app.use("/createForm",createFormRoutes);

        app.use("/formInfo",formInfoRoutes);

        app.use("/adminDelete",deleteFormRoutes);

        app.use("/adminEditForm",editFormAdminRoutes);

        app.use("/registrationUser",registrationUserRoutes);

        app.use("/register",registerFormRoutes);

        app.use("/registerFormToUser",registerFormToUserRoutes);

        app.use("/registeredForms",registeredFormsRoutes);

        app.get("/admin",(req,res)=>{
            res.render('admin',{title:'Admin Page',createFormActive:"active",show:true,formInfoActive:""});
        });

        app.use("/user",userRoutes);

        app.get("/allUsers",async(req,res)=>{
            let users = await data.getAllUsers();
            res.json(users);
        });

        app.get("/allforms",async(req,res)=>{

            let forms = await data.getAllForms();

            res.json(forms);
        })

        app.get("/allform/:id",async(req,res)=>{

            let forms = await data.getForm(req.params.id);

            res.json(forms);
        })

        app.get("/allRegisterForms",async(req,res)=>{
            let reg = await data.getRegisterUserToForm();
            res.json(reg);
        });

        app.use("/login",loginMiddelWearRoutes);

        app.use("/logout",(req,res)=>{
            res.clearCookie('name'); 
            res.redirect("/");
        });

        
    
        app.get("/public/site.css", async (req, res) => {

            let filePath = await path.join(__dirname,"../css/style.css");
       
            res.sendFile(filePath);
        });


        app.use("/",(req,res)=>{
            // let filePath = path.join(__dirname,"../public/index.html");
            res.render('login',{title:'Login Page',show:false});
            // res.sendFile(filePath,{title:'Book my Event' });
        });
    };

    module.exports = constructorMethod;
}
catch(e){
    throw console.log("Problem occured in Displaying Page.");
}

