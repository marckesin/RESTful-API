const md5 = require("md5");
const User = require("../models/user.model");

exports.userGetAll = async (req, res) => {
  await User.find({}).exec((err, result) => {
    res.send(result);
  });
};

exports.userGetById = async (req, res) => {
  const id = req.params.id;

  await User.findById(id).exec((err, result) => {
    if (!err && result) {
      return res.status(200).send(result);
    }
    res.sendStatus(404);
  });
};

exports.userCreate = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: md5(req.body.password),
  });

  await user.validate(err => {
    if (!err) {
      res.sendStatus(201);
      user.save();
    }
  });
};

exports.userUpdate = async (req, res) => {
  const id = req.params.id;
  const { username, password } = req.body;

  await User.findByIdAndUpdate(id, {
    username: username,
    password: password,
  }).exec((err, result) => {
    if (!err && result) {
      return res.status(200).send(result);
    }
    res.sendStatus(404);
  });
};

exports.userDelete = async (req, res) => {
  const id = req.params.id;

  await User.findByIdAndDelete(id).exec((err, result) => {
    if (!err && result) {
      return res.status(200).send(result);
    }
    res.sendStatus(404);
  });
};
