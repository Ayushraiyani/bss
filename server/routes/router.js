const express = require('express');
const route = express.Router();
const services = require('../services/render');

const controllers = require("../controller/controller");

//all get routes
/**
 * @description Root Routes 
 * @method GET
**/

route.get("/", services.homeRoutes);

/**
 * @description Add User
 * @method GET /adduser
**/
route.get("/add-user", services.add_user);

/**
 * @description Update User
 * @method GET /updateuser
**/
route.get("/update-user", services.update_user);






//API routes
route.post("/api/users", controllers.create);
route.get("/api/users", controllers.find);
route.put("/api/users/:id", controllers.update);
route.delete("/api/users/:id", controllers.delete);

module.exports = route;