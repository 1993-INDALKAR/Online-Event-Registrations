const mongoCollections = require("../setting/mongoCollection");
const todoItems = mongoCollections.todoItems;
const users = mongoCollections.users;
const register = mongoCollections.register;
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

module.exports = {

    async registerForm(data,id){

        const formRegisterCollection = await register();

        const user = await formRegisterCollection.findOne({ formId: id });
        console.log("hi3");
        console.log(user);

        if(user != null){

            console.log(data.userId);

            let updateData = {
                id : data.userId,
                name : data.name,
                number : data.number
            };

            //   user.user.push(updateData);

            //   let update = user.user;

            // console.log(update);
            // console.log(user);

            let updateCommand = {
                $addToSet: {user : updateData}
            };

            const query = {
                _id: user._id
            };

            console.log(query);
            console.log(updateCommand);

            let reg = await formRegisterCollection.updateOne(query, updateCommand);

            // console.log(reg);
    
            if (reg == null) {
                return { message: "Could notUpdate form" };
            }
    
            return await this.getRegisterUserToForm(id);

            // console.log(user.user);

        }
        else{
           let create =  await this.createRegisterForm(data,id);

           console.log(create);

           return create;
        }


    },

    async getallRegisteredForms(){

        const formRegisterCollection = await register();


        const formsData = await formRegisterCollection.find({}).toArray();

        return formsData;


    }, 

    async createRegisterForm(data,id){

        const formRegisterCollection = await register();

        let newFormRegister = {
            _id: uuidv1(),
            formId : id,
            user :[ {
                id : data.userId,
                name : data.name,
                number : data.number
            }
        ]
        }

        console.log("hi1");

        const insertInfo = await formRegisterCollection.insertOne(newFormRegister);
        if (insertInfo.insertedCount === 0) return {message : "Could not Create User"};
        const newId = insertInfo.insertedId;
        const reg = await this.getRegisterUserToForm(newId);

        // console.log(task);
        console.log("hi2");
        return reg;


    },

    async checkFormRegisteredByUser(id){

        const formRegisterCollection = await register();

        // console.log(id);

        const form = await formRegisterCollection.findOne({ formId: id });

        return form;
    },

    async getRegisterUserExist(idUser){

        if (typeof idUser != "string") {
            return { message: "id is not a string in getRecipe function" };
        }

        if (!idUser) return { message: "Please Provide an ID." };

        const formRegisterCollection = await register();

        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

        // const user = await formRegisterCollection.findOne({ user : {$elemMatch : {id : id} } });
        // const user = await formRegisterCollection.find({ user : {$elemMatch : {id : id} } });       
        // const user = await formRegisterCollection.find({ "user.id" : id });
        const users = await formRegisterCollection.find(
            {"user.id": idUser},
            {"user": {$elemMatch: {id: idUser}}});       

        // console.log(user);

        console.log(users.user);

        if (users === null) return { message: `There is no such form with the ID "${id}" in database.` };

        return users;

    },

    async getRegisterUserToForm(id) {

        try {

            // console.log(id);

            if (typeof id != "string") {
                return { message: "id is not a string in getRecipe function" };
            }

            if (!id) return { message: "Please Provide an ID." };

            const formRegisterCollection = await register();

            const form = await formRegisterCollection.findOne({ _id: id });

            if (form === null) return { message: `There is no such form with the ID "${id}" in database.` };

            return form;

        }
        catch (e) {
            return { message: "Ther is problem reading from database" };
        }

    },

    async getRegisterUserToForm(){

        const formRegisterCollection = await register();

        const registerData = await formRegisterCollection.find({}).toArray();

        return registerData;

    },

    async createUser(data) {


        const userCollection = await users();

        let hash = bcrypt.hashSync(data.password, 10);

        let newUser = {
            _id: uuidv1(),
            firstName: data.firstName,
            lastName : data.lastName,
            email : data.email,
            password : data.password,
            dob : data.dob,
            password : hash,
            type : "U"
        }



        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) return {message : "Could not Create User"};
        const newId = insertInfo.insertedId;
        const user = await this.getUser(newId);

        // console.log(task);

        return user;

    },

    async getUser(id) {

        try {

            // console.log(id);

            if (typeof id != "string") {
                return { message: "id is not a string in getRecipe function" };
            }

            if (!id) return { message: "Please Provide an ID." };

            const userCollection = await users();

            const user = await userCollection.findOne({ _id: id });

            if (user === null) return { message: `There is no such form with the ID "${id}" in database.` };

            return user;

        }
        catch (e) {
            return { message: "Ther is problem reading from database" };
        }

    },

    async getAllUsers() {

        const userCollection = await users();

        const usersData = await userCollection.find({}).toArray();

        return usersData;

    },

    async getAllForms() {

        const taskCollection = await todoItems();

        const tasks = await taskCollection.find({}).toArray();

        return tasks;

    },

    async createForm(body) {

        // console.log(body);

        // if (!title) throw "You must provide a Title for TASK";

        // if (!description) throw "You must provide a Description for TASK";

        //https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js

        if (!uuidv1) throw "Sorry could not generate Unique Id for New Task";

        const taskCollection = await todoItems();

        let ageRestriction;

        switch (body.age) {
            case "option1":

                ageRestriction = true;
                break;

            case "option2":

                ageRestriction = false;

        }

        console.log("ageRestriction" + ageRestriction);
        let genderRestriction;
        switch (body.gender) {
            case "option1":

                genderRestriction = "M";
                break;

            case "option2":

                genderRestriction = "F";
                break;

            case "option3":

                genderRestriction = "MF"

        }

        // console.log("genderRestriction:" + genderRestriction);

        let newTask = {
            _id: uuidv1(),
            title: body.eventName,
            location: body.eventPlace,
            date: body.eventDate,
            time: body.eventTime,
            seats: body.noOfSeats,
            ageRestriction: ageRestriction,
            genderRestriction: genderRestriction,
            description: body.description,
            cost: body.costForOne
        }

        // console.log(newTask);



        const insertInfo = await taskCollection.insertOne(newTask);
        if (insertInfo.insertedCount === 0) throw "Could not Insert TASK."
        const newId = insertInfo.insertedId;
        const task = await this.getForm(newId);

        // console.log(task);

        return task;
    },

   

    async getForm(id) {

        try {

            // console.log(id);

            if (typeof id != "string") {
                return { message: "id is not a string in getRecipe function" };
            }

            if (!id) return { message: "Please Provide an ID." };

            const taskCollection = await todoItems();

            const form = await taskCollection.findOne({ _id: id });

            if (form === null) return { message: `There is no such form with the ID "${id}" in database.` };

            console.log(form);
            return form;

        }
        catch (e) {
            return { message: "Ther is problem reading from database" };
        }

    },

    async deleteForm(id) {

        try {

            // console.log(id);

            if (!id) return { message: "Please Provide an ID." };

            // if(typeof id != "string"){
            //     return {message : "id is not a string in deleteRecipe function"};
            // }

            const taskCollection = await todoItems();

            let formExist = {};
            formExist = await this.getForm(id);
            // console.log(formExist);
            if (formExist.message) {
                return formExist;
            }


            const form = await taskCollection.removeOne({ _id: id });

            // console.log(form);

            // if (form === null) return { message: `Could not delete recipe with the ID "${id}" from database.` };
            if (form === null) return false
            // else return {message : "Form is Deleted"};
            else return true

        }
        catch (e) {
            return { message: "Problem in deleting from Database." }
        }




    },

    async replaceRecipe(id, updateForm) {

        try {



            let updateCommand = {
                $set: updateRecipeData
            };

            const query = {
                _id: id
            };

            let recp = await taskCollection.updateOne(query, updateCommand);

            if (recp == null) {
                return { message: "Could notUpdate Recipe" };
            }

            return await this.getForm(id);

        }
        catch (e) {

            return { message: "Problem in replacing the recipe" };

        }



    },

    async  isEmpty(obj) {

        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                console.log("hi");
            return false;
        }
        console.log("hiiii");
        return true;
    },

    async checkEmail(email){

        const userCollection = await users();

        const userExist = await userCollection.findOne({ email: email });

        console.log(userExist);

        return userExist;

    }
}