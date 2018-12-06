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
        const task = await this.getTask(newId);

        // console.log(task);

        return task;
    },

    async getAllForms() {

        const taskCollection = await todoItems();

        const tasks = await taskCollection.find({}).toArray();

        return tasks;

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