const mongoCollections = require("../setting/mongoCollection");
const todoItems = mongoCollections.todoItems;
const users = mongoCollections.users;
const register = mongoCollections.register;
const comment = mongoCollections.comment;
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

module.exports = {

    async updateUserRegisteredEvent(data, formId, userId) {

        try {



            const formRegisterCollection = await register();

            const user = await formRegisterCollection.findOne({ formId: formId });

            if (user != null) {


                let updateData = {
                    // id: userId,
                    name: data.personName,
                    number: data.numOfTickets
                };


                let updateCommand = {
                    $Set: { user: updateData }
                };

                const query = {
                    _id: user._id,

                };


                // let reg = await formRegisterCollection.updateOne(, updateCommand);

                // formRegisterCollection.update( {_id : user.id , "user.id" : userId} ,
                //    {$set : {updateData}} ,
                //    false ,
                //    true);

                // let reg = formRegisterCollection.updateOne(
                //     { },
                //     { $set : { "user.$[usr].name" : data.personName, "user$[usr].number" : data.number } },
                //     { arrayFilters : [ {"user.id" : { $eq: userId } } ]
                //       }
                //  );

                let reg = formRegisterCollection.updateOne(
                    { "user.id": userId },
                    {
                        $set: {
                            "user.$.name": updateData.name,
                            "user.$.number": updateData.number,

                        }
                    });

                console.log("reg:" + reg);



                if (reg == null) {
                    return { message: "Could notUpdate form" };
                }

                return await this.getRegisterUserToForm(formId);

            }
            else {
                return { message: "User has not registered for the event." }
            }
        }
        catch (e) {

            throw console.log(e);

        }

    },

    async registerForm(data, id) {

        try {



            const formRegisterCollection = await register();

            const user = await formRegisterCollection.findOne({ formId: id });


            if (user != null) {

                // console.log(data.userId);

                let updateData = {
                    id: data.userId,
                    name: data.name,
                    number: data.number
                };

                //   user.user.push(updateData);

                //   let update = user.user;

                // console.log(update);
                // console.log(user);

                let updateCommand = {
                    $addToSet: { user: updateData }
                };

                const query = {
                    _id: user._id
                };

                // console.log(query);
                // console.log(updateCommand);

                // console.log("hi");

                let reg = await formRegisterCollection.updateOne(query, updateCommand);

                console.log(reg);

                // console.log(reg);

                console.log("1");

                if (reg == null) {
                    return { message: "Could notUpdate form" };
                }

                console.log("2");

                return await this.getRegisterUserToForm(id);

                // console.log(user.user);

            }
            else {
                let create = await this.createRegisterForm(data, id);



                return create;
            }

        }
        catch (e) {

            throw e;

        }

    },

    async addComment(data, userId, formId) {
        try {

            const commentCollection = await comment();

            const form = await commentCollection.findOne({ formId: formId });

            if (form != null) {

                // console.log(data.userId);

                let updateData = {
                    id: userId,
                    comment: data
                };



                let updateCommand = {
                    $addToSet: { user: updateData }
                };

                const query = {
                    _id: form._id
                };



                let reg = await commentCollection.updateOne(query, updateCommand);


                if (reg == null) {
                    return { message: "Could notUpdate form" };
                }


                // return await this.getAddedComment(id);

                return reg;


            }
            else {
                let create = await this.createComment(data, userId, formId);

                return create;
            }


        }
        catch (e) {
            console.log(e);
        }
    },

    async createComment(data, userId, formId) {

        const commentCollection = await comment();

        let newComment = {
            _id: uuidv1(),
            formId: formId,
            user: [{
                id: userId,
                comment: data
            }
            ]
        }

        const insertInfo = await commentCollection.insertOne(newComment);
        if (insertInfo.insertedCount === 0) return { message: "Could not Create comment" };
        const newId = insertInfo.insertedId;
        const reg = await this.getAddedComment(newId);

        return reg;
    },

    async getAddedComment(id) {

        try {

            // console.log(id);

            if (typeof id != "string") {
                return { message: "id is not a string in getRecipe function" };
            }

            if (!id) return { message: "Please Provide an ID." };

            const commentCollection = await comment();

            const comment = await commentCollection.findOne({ _id: id });

            if (comment === null) return { message: `There is no such form with the ID "${id}" in database.` };

            return comment;

        }
        catch (e) {
            return { message: "Ther is problem reading from database" };
        }

    },

    async deleteRegisterUserFromForm(idForm, userId) {

        try {
            if (!idForm) return { message: "Please Provide form ID" };
            if (!userId) return { message: "Please provide User Id" };

            if (typeof idForm != "string") {
                return { message: "id is not a string " };
            }

            if (typeof userId != "string") {
                return { message: "id is not a string " };
            }

            const formRegisterCollection = await register();

            const objId = await formRegisterCollection.findOne({ formId: idForm });

            // console.log(objId._id);

            // let del = await formRegisterCollection.update(
            //     { '_id': ObjectId(objId._id) },
            //     { $pull: { "user": { "id": userId } } },
            //     false,
            //     true
            // );

            let del = await formRegisterCollection.findOneAndUpdate({ _id: objId._id }, { $pull: { user: { "id": userId } } });

            // console.log(del);
            if (del == null) return { message: "Could not delete form." };

            return del;

        }
        catch (e) {
            return { message: "Problem in deleting from Database." }
        }

    },

    async deleteRegisterForms(id) {

        try {

            // console.log(id);

            if (!id) return { message: "Please Provide an ID." };

            if (typeof id != "string") {
                return { message: "id is not a string in deleteRecipe function" };
            }

            const formRegisterCollection = await register();

            let formExist = {};
            // formExist = await this.get(id);
            // // console.log(formExist);
            // if (userExist.message) {
            //     return formExist;
            // }


            const formReg = await formRegisterCollection.removeOne({ _id: id });

            // console.log(form);

            // if (form === null) return { message: `Could not delete recipe with the ID "${id}" from database.` };
            if (formReg === null) return false
            // else return {message : "Form is Deleted"};
            else return true

        }
        catch (e) {
            return { message: "Problem in deleting from Database." }
        }




    },

    async getallRegisteredForms() {

        const formRegisterCollection = await register();


        const formsData = await formRegisterCollection.find({}).toArray();

        return formsData;


    },

    async createRegisterForm(data, id) {

        const formRegisterCollection = await register();

        let newFormRegister = {
            _id: uuidv1(),
            formId: id,
            user: [{
                id: data.userId,
                name: data.name,
                number: data.number
            }
            ]
        }


        const insertInfo = await formRegisterCollection.insertOne(newFormRegister);
        if (insertInfo.insertedCount === 0) return { message: "Could not Create User" };
        const newId = insertInfo.insertedId;
        const reg = await this.getRegisterUserToForm(newId);

        return reg;


    },

    async checkFormRegisteredByUser(id) {

        const formRegisterCollection = await register();

        // console.log(id);

        const form = await formRegisterCollection.findOne({ formId: id });

        return form;
    },

    async getRegisterUserExist(idUser) {

        if (typeof idUser != "string") {
            return { message: "id is not a string in getRecipe function" };
        }

        if (!idUser) return { message: "Please Provide an ID." };

        const formRegisterCollection = await register();

        // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

        // const user = await formRegisterCollection.findOne({ user : {$elemMatch : {id : id} } });
        // const user = await formRegisterCollection.find({ user : {$elemMatch : {id : id} } });       
        // const user = await formRegisterCollection.find({ "user.id" : id });
        const users = await formRegisterCollection.find(
            { "user.id": idUser },
            { "user": { $elemMatch: { id: idUser } } });

        // console.log(user);

        // console.log(users.user);

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

    async getRegisterUserToForm() {

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
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            dob: data.dob,
            password: hash,
            type: "U"
        }



        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) return { message: "Could not Create User" };
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

            // console.log("id:"+id);

            const user = await userCollection.findOne({ _id: id });

            if (user === null) return { message: `There is no such user with the ID "${id}" in database.` };

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

        try {

            // if (!title) throw "You must provide a Title for TASK";

            // if (!description) throw "You must provide a Description for TASK";



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


            const insertInfo = await taskCollection.insertOne(newTask);
            if (insertInfo.insertedCount === 0) throw "Could not Insert TASK."
            const newId = insertInfo.insertedId;
            const task = await this.getForm(newId);



            return task;

        }
        catch (e) {
            console.log(e);
        }




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

            // console.log(form);
            return form;

        }
        catch (e) {
            return { message: "Ther is problem reading from database" };
        }

    },

    async deleteUser(id) {

        try {

            // console.log(id);

            if (!id) return { message: "Please Provide an ID." };

            // if(typeof id != "string"){
            //     return {message : "id is not a string in deleteRecipe function"};
            // }

            const userCollection = await users();

            let userExist = {};
            userExist = await this.getUser(id);
            // console.log(formExist);
            if (userExist.message) {
                return formExist;
            }


            const user = await userCollection.removeOne({ _id: id });

            // console.log(form);

            // if (form === null) return { message: `Could not delete recipe with the ID "${id}" from database.` };
            if (user === null) return false
            // else return {message : "Form is Deleted"};
            else return true

        }
        catch (e) {
            return { message: "Problem in deleting from Database." }
        }




    },

    async deleteForm(id) {

        try {

            // console.log(id);

            if (!id) return { message: "Please Provide an ID." };

            if (typeof id != "string") {
                return { message: "id is not a string in deleteRecipe function" };
            }

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

    async replaceForm(id, updateForm) {

        try {

            if (!id) return { message: "Please Provide an ID." };

            if (typeof id != "string") {
                return { message: "id is not a string " };
            }

            let updateFormData = {};

            if (updateForm.name.length > 0) {
                updateFormData.title = updateForm.name;
            }
            else {
                return { message: "Form name is Required." };
            }

            if (updateForm.location.length > 0) {
                updateFormData.location = updateForm.location;
            }
            else {
                return { message: "Location is Required." };
            }

            if (updateForm.eventDate.length > 0) {
                updateFormData.date = updateForm.eventDate;
            }
            else {
                return { message: "Event Date is Required." };
            }

            if (updateForm.eventTime.length > 0) {
                updateFormData.time = updateForm.eventTime;
            }
            else {
                return { message: "Event Time is Required." };
            }

            if (updateForm.noOfSeats.length > 0) {
                updateFormData.seats = updateForm.noOfSeats;
            }
            else {
                return { message: "Seats is Required." };
            }

            if (typeof updateForm.age == "boolean") {
                updateFormData.ageRestriction = updateForm.age;
            }
            else {
                return { message: "Age is Required." };
            }

            if (updateForm.gender.length > 0) {
                updateFormData.genderRestriction = updateForm.gender;
            }
            else {
                return { message: "Age is Required." };
            }

            if (updateForm.description.length > 0) {
                updateFormData.description = updateForm.description;
            }
            else {
                return { message: "Gender is Required." };
            }




            let updateCommand = {
                $set: updateFormData
            };

            const query = {
                _id: id
            };

            // console.log(query);
            // console.log(updateCommand);

            const taskCollection = await todoItems();

            let form = await taskCollection.updateOne(query, updateCommand);

            if (form == null) {
                return { message: "Could notUpdate Form" };
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
        // console.log("hiiii");
        return true;
    },

    async checkEmail(email) {

        const userCollection = await users();

        const userExist = await userCollection.findOne({ email: email });

        // console.log(userExist);

        return userExist;

    }
}