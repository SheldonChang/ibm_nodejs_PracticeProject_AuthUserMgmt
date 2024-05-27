const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": { "firstName": "John", "lastName": "Doe", "DOB": "22-12-1990" }, "annasmith@gamil.com": { "firstName": "Anna", "lastName": "smith", "DOB": "02-07-1983" }, "peterjones@gamil.com": { "firstName": "Peter", "lastName": "Jones", "DOB": "21-03-1989" }
};


// GET request: Retrieve all friends
router.get("/", (req, res) => {

    // Update the code here
    res.json(JSON.stringify(friends, null, 4));
    //   res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
    // Update the code here
    const email = req.params.email;
    // const user = friends.filter((friend) => {
    //     return friend.email === email;
    // })
    res.json(JSON.stringify(friends[email]));
    // res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// POST request: Add a new friend
router.post("/", (req, res) => {
    // Update the code here
    if (req.body.email) {
        friends[req.body.email] = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "DOB": req.body.DOB
        }
    }
    res.send(`The user ${req.body.firstName} has been added!`);//This line is to be replaced with actual return value
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
    // Update the code here
    const email = req.params.email;
    let user = friends[email];
    if (user) {
        user["DOB"] = req.body.DOB ? req.body.DOB : user.DOB;
        user["lastName"] = req.body.lastName ? req.body.lastName : user.lastName;
        user["firstName"] = req.body.firstName ? req.body.firstName : user.firstName;
        friends[email] = user;
        res.send(`Friend with ${email} has been updated.`);
    } else {
        res.send("Unable to find friend.")
    }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
    const email = req.params.email;
    let user = friends[email];
    if (user) {
        delete friends[email];
        res.send(`Friend with the email ${email} has been deleted.`);
    } else {
        res.send("Unable to find friend.")
    }
});

module.exports = router;
