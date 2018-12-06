const createFormRoutes = require("./createForm");
const formInfoRoutes = require("./formInfo");
const data = require("../data");
const path = require("path");

try{
    const constructorMethod =app =>{
        
        app.use("/createForm",createFormRoutes);

        app.use("/formInfo",formInfoRoutes);

        app.get("/admin",(req,res)=>{
            res.render('admin',{title:'Admin Page',createFormActive:"active",formInfoActive:""});
        });

        app.post("/adminDelete",(req,res)=>{

            let list = req.body;
            console.log("itemsSelected:"+JSON.stringify(list));

        });
    
        app.get("/public/site.css", async (req, res) => {

            let filePath = await path.join(__dirname,"../css/style.css");
       
            res.sendFile(filePath);
        });
    };

    module.exports = constructorMethod;
}
catch(e){
    throw console.log("Problem occured in Displaying Page.");
}

