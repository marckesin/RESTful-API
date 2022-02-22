const md5 = require("md5");
const User = require("../models/user.model");

exports.userGetAll = async (req, res) => {
  await User.find({}).exec((err, result) => {
    return res.send(result);
  });
};

exports.userGetById = async (req, res) => {
  const { id } = req.params;

  await User.findById(id).exec((err, result) => {
    if (!err && result) {
      return res.status(200).send(result);
    }
    return res.sendStatus(404);
  });
};

exports.userCreate = async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: md5(req.body.password),
    });

    await user.validate(err => {
      if (!err) {
        res.status(201).send("User created.");
        user.save();
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.userUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    await User.findByIdAndUpdate(id, {
      username: username,
      password: md5(password),
    }).exec((err, result) => {
      if (!err && result) {
        return res.status(200).send("User updated.");
      }
      return res.sendStatus(404);
    });
  } catch (error) {
    next(error);
  }
};

exports.userDelete = (req, res) => {
  const { id } = req.params;

  User.deleteOne({ _id: id }, (err, result) => {
    if (!err && result.deletedCount) {
      return res.status(200).send("User deleted.");
    }
    return res.sendStatus(404);
  });
};
