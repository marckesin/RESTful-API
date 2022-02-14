const User = require("../models/user.model");

exports.userGetAll = async (req, res) => {
  await User.find({}).exec((err, result) => {
    res.send(result);
  });
};

exports.userGetById = async (req, res) => {
  const id = req.params.id;

  await User.findById(id).exec((err, result) => {
    if (!err) {
      return res.status(200).send(result);
    }
    res.sendStatus(404);
  });
};

exports.userCreate = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  await user.validate(err => {
    if (!err) {
      res.sendStatus(201);
      user.save();
    }
  });
};
