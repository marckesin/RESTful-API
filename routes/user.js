const express = require("express");
const User = require("../models/user.model");
const usersController = require("../controllers/userControllers");

const router = express.Router();

router.get("/users", usersController.userGetAll);

router.get("/users/:id", usersController.userGetById);

router.post("/users", usersController.userCreate);

module.exports = router;
