// const bcrypt = require('bcrypt');
// const mongoCollections = require("./setting/mongoCollection");
// const todoItems = mongoCollections.todoItems;
// const users = mongoCollections.users;
const data = require("./data");



async function main() {

    let password = "patrickHill";

    let user = {
        firstName: "Patrick",
        lastName: "Hill",
        email: "phill@stevens.edu",
        password: "patrickHill",
        dob: "1980-11-23",
        type: "A"
    }

    let createUser = await data.createUser(user);

    console.log(createUser);


}

main();