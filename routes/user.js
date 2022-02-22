const express = require("express");
const usersController = require("../controllers/userControllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.send('<a href="/users">/users</a>');
});

router.get("/users", usersController.userGetAll);

router.get("/users/:id", usersController.userGetById);

router.post("/users", usersController.userCreate);

router.put("/users/:id", usersController.userUpdate);

router.delete("/users/:id", usersController.userDelete);

router.all("*", (req, res) => {
  res.status(404).send("Endpoint not found.");
});

router.use("/users/:id", (err, req, res, next) => {
  res.locals.message = err.message;
  res
    .status(err.status || 500)
    .json({ method: req.method, error: err.message });
  next();
});

module.exports = router;
