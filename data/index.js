const mongoCollections = require("../setting/mongoCollection");
const todoItems = mongoCollections.todoItems;


module.exports = {

    async createForm(body) {

        // console.log(body);

        // if (!title) throw "You must provide a Title for TASK";

        // if (!description) throw "You must provide a Description for TASK";

        const uuidv1 = require('uuid/v1');  //https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js

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

        console.log("genderRestriction:" + genderRestriction);

        let newTask = {
            _id: uuidv1(),
            title: body.eventName,
            location: body.eventPlace,
            date: body.eventDate,
            time: body.eventTime,
            seats: body.noOfSeats,
            ageRestriction: ageRestriction,
            genderRestriction: genderRestriction,
            description: body.description
        }

        // console.log(newTask);



        const insertInfo = await taskCollection.insertOne(newTask);
        if (insertInfo.insertedCount === 0) throw "Could not Insert TASK."
        const newId = insertInfo.insertedId;
        const task = await this.getForm(newId);

        // console.log(task);

        return task;
    },

    async getAllForms() {

        const taskCollection = await todoItems();

        const tasks = await taskCollection.find({}).toArray();

        return tasks;

    },

    async getForm(id) {

        try {

            console.log(id);

            if(typeof id != "string"){
                return {message : "id is not a string in getRecipe function"};
            }

            if (!id) return { message: "Please Provide an ID." };

            const taskCollection = await todoItems();

            const form = await taskCollection.findOne({ _id: id });

            if (form === null) return { message: `There is no such form with the ID "${id}" in database.` };

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
    }
}