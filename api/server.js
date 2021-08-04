// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model.js")
const server = express();




server.use(express.json()); 
  


server.get("api/users/:id", (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => res.json(user))
        .catch(() => res.status(500).json({
            message: "The users information could not retreieved"
        }))
          
        
})

// | GET    | /api/users     | Returns an array users.                                                                                |
server.get("api/users/:id", (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: "The user with that ID does not exist"
                })
            } else {
                res.json(user)
            }
        })
        .catch(() => res.status(500).json({
            message: "the user information could not be retreived" 
        }))
})



// | GET    | /api/users/:id | Returns the user object with the specified `id`.          
                     

server.post("api/users", (req, res) => {
    const body = req.body;
    if(!body.name || !body.bio){
        res.status(400).json({
            message: "Please provide a name and bio for this user"
        })
    }
    else {
        User.insert(body)
        .then(user => res.status(201).json(user))
        .catch(() => res.status(500).json({
            message: "There was an error while saving the user in the database"
        }))
    }
})



// | POST   | /api/users     | Creates a user using the information sent inside the `request body`. 

  

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if(!body.name || !body.bio) {
        res.status(400).json({
            message: "Please provide the name and bio for the user"
        })
    } else {
    User.update(id, body)
    .then(user => {
        if(!user){
            res.status(404).json({
                message: "the user with the specieifed id does not exist"
            })
        } else {
            res.json(user)
        }
    })
    .catch(() => res.status(500).json({
        message: "The user information could not be modified"
    }))
    }
} )
                            
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
// //



server.delete("api/users/:id", (req, res) => {
    const id = req.params.id;
    User.remove(id)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: "The user with that epsiciefed id does not exist"
                })
            } else {
                res.json(user)
            }
        })
        .catch(() => res.status(500).json({
            message: "The user could not be removed"
        }))
})




// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.   




module.exports = server; // EXPORT YOUR SERVER instead of {}
