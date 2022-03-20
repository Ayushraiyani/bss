var Bssdb = require("../model/model");

//create and save new user

exports.create = (req,res) => {
    //validate request
    if(!req.body){
        res.status(400).send({message: 'Content can not be empty!'});
        return;
    }

    //new users
    const user = new Bssdb({
        bssid: req.body.bssid,
        name: req.body.name,
        number: req.body.mobile,
        // gender: req.body.gender,
        attendence: req.body.attendance
    })

    //save user in database
    user
        .save(user)
        .then(data=>{
            // res.send(data);
            res.redirect("/");
        })
        .catch(err => {
            res.status(500,{
                message: err.message || "some error occurred while creating a create opration",
            });
        });
}

//retrive and return all users / retrive and return a single user
exports.find = (req,res) => {

    if(req.query.id){
        const id = req.query.id;

        Bssdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "Not found User by Id:"+id});
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error retriving user with id:" +id});
        });
    }else{
        Bssdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occurred while retrieving user information"})
        })
    }
    
}

//update a new idetified user by user id
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Data to update can not be empty"})
    }

    const id = req.params.id;
    Bssdb.findByIdAndUpdate(id, req.body ,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message: `Cannot Update user with ${id}. Maybe  user not found`})
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error Update user information"})
        })
}




//delete a user with spesified id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Bssdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
            res.send({
                message: `User was deleted successfully`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Could not dalete User with id=` + id
        });
    });
}


